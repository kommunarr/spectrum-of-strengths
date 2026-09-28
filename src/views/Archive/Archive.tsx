import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ArchiveEntryArticle from './ArchiveEntryArticle';
import type { ArchiveEntry } from './ArchiveEntryArticle';
import '../contentPages.css';
import './Archive.css';

const archiveCategories = ['heritage', 'research', 'experience', 'gaps', 'progress'] as const;
const rotationInterval = 6_000;

function Archive() {
    const { t } = useTranslation(['common']);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [isRotationRequested, setIsRotationRequested] = useState(true);
    const [hasInteractionPausedRotation, setHasInteractionPausedRotation] = useState(false);
    const [isPointerHovering, setIsPointerHovering] = useState(false);
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const [slideAnnouncement, setSlideAnnouncement] = useState('');
    const isRotationEnabled = isRotationRequested && !hasInteractionPausedRotation && !isPointerHovering && !prefersReducedMotion;
    const entries = (t('archivePage.entries', { returnObjects: true }) as ArchiveEntry[])
        .slice()
        .sort((left, right) => right.publicationDate.localeCompare(left.publicationDate));

    useEffect(() => {
        if (typeof window.matchMedia !== 'function') return;

        const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        function updateMotionPreference() {
            setPrefersReducedMotion(reducedMotionQuery.matches);
            if (reducedMotionQuery.matches) setIsRotationRequested(false);
        }

        updateMotionPreference();
        reducedMotionQuery.addEventListener('change', updateMotionPreference);
        return () => {
            reducedMotionQuery.removeEventListener('change', updateMotionPreference);
        };
    }, []);

    useEffect(() => {
        if (!isRotationEnabled) return;

        const rotationTimer = window.setInterval(() => {
            setActiveCategoryIndex((currentIndex) => (currentIndex + 1) % archiveCategories.length);
        }, rotationInterval);

        return () => {
            window.clearInterval(rotationTimer);
        };
    }, [isRotationEnabled]);

    function moveToCategory(direction: -1 | 1) {
        const nextIndex = (activeCategoryIndex + direction + archiveCategories.length) % archiveCategories.length;
        setActiveCategoryIndex(nextIndex);
        setSlideAnnouncement(t('homePage.slideAnnouncement', {
            current: nextIndex + 1,
            total: archiveCategories.length,
            title: t(`archivePage.${archiveCategories[nextIndex]}Title`),
        }));
    }

    return (
        <article className="archivePage">
            <header className="contentPageHeader">
                <p className="homeEyebrow">{t('homePage.eyebrow')}</p>
                <h1>{t('archivePage.title')}</h1>
                <p>{t('archivePage.intro')}</p>
            </header>

            <section aria-labelledby="archive-categories-title">
                <h2 className="archiveSectionTitle" id="archive-categories-title">
                    {t('archivePage.categoriesTitle')}
                </h2>
                <div className="archiveCategories">
                    {archiveCategories.map((category) => (
                        <article className="archiveCategory" key={category}>
                            <h3>{t(`archivePage.${category}Title`)}</h3>
                            <p>{t(`archivePage.${category}Body`)}</p>
                        </article>
                    ))}
                </div>
                <div
                    className="archiveCarouselMotion"
                    role="group"
                    aria-labelledby="archive-categories-title"
                    aria-roledescription={t('homePage.carouselRoleDescription')}
                    onFocusCapture={() => {
                        setHasInteractionPausedRotation(true);
                    }}
                    onPointerEnter={() => {
                        setIsPointerHovering(true);
                    }}
                    onPointerLeave={() => {
                        setIsPointerHovering(false);
                    }}
                >
                    <div className="valueCarouselControls">
                        <button
                            type="button"
                            aria-controls="archive-carousel-slides"
                            onClick={() => {
                                if (isRotationRequested) {
                                    setIsRotationRequested(false);
                                } else {
                                    setHasInteractionPausedRotation(false);
                                    setIsRotationRequested(true);
                                }
                            }}
                            aria-label={t(isRotationRequested ? 'homePage.pauseRotation' : 'homePage.resumeRotation')}
                        >
                            <span aria-hidden="true">{isRotationRequested ? 'Ⅱ' : '▶'}</span>
                        </button>
                        <button type="button" aria-controls="archive-carousel-slides" aria-label={t('archivePage.previousTheme')} onClick={() => {
                            moveToCategory(-1);
                        }}>
                            <span aria-hidden="true">‹</span>
                        </button>
                        <span className="valueCarouselPosition" aria-hidden="true">
                            {activeCategoryIndex + 1} / {archiveCategories.length}
                        </span>
                        <button type="button" aria-controls="archive-carousel-slides" aria-label={t('archivePage.nextTheme')} onClick={() => {
                            moveToCategory(1);
                        }}>
                            <span aria-hidden="true">›</span>
                        </button>
                    </div>
                    <div className="archiveCarouselViewport" id="archive-carousel-slides" aria-live="off">
                        {archiveCategories.map((category, index) => (
                            <div
                                className="archiveCategory archiveCarouselSlide"
                                key={category}
                                aria-hidden={activeCategoryIndex !== index}
                                role="group"
                                aria-roledescription={t('homePage.slideRoleDescription')}
                                aria-label={t('homePage.slidePosition', {
                                    current: index + 1,
                                    total: archiveCategories.length,
                                })}
                            >
                                <h3>{t(`archivePage.${category}Title`)}</h3>
                                <p>{t(`archivePage.${category}Body`)}</p>
                            </div>
                        ))}
                    </div>
                    <p className="valueCarouselAnnouncement" role="status" aria-live="polite" aria-atomic="true">
                        {slideAnnouncement}
                    </p>
                </div>
            </section>

            <section className="archiveEntries" aria-labelledby="archive-entries-title">
                <h2 className="archiveSectionTitle" id="archive-entries-title">
                    {t('archivePage.entriesTitle')}
                </h2>
                <p className="archiveEntriesIntro">{t('archivePage.entriesIntro')}</p>
                {entries.length === 0 ? (
                    <div className="archiveEmpty" aria-labelledby="archive-empty-title" role="status">
                        <h3 id="archive-empty-title">{t('archivePage.emptyTitle')}</h3>
                        <p>{t('archivePage.emptyBody')}</p>
                        <p className="archiveDateNote">{t('archivePage.dateNote')}</p>
                    </div>
                ) : (
                    <ul className="archiveEntryList">
                        {entries.map((entry) => (
                            <li key={entry.id}>
                                <ArchiveEntryArticle entry={entry} />
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </article>
    );
}

export default Archive;
