import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../contentPages.css';
import './Home.css';

const valuePillars = ['capture', 'transformation', 'creation', 'preservation'];
const rotationInterval = 28_000;

function getReducedMotionPreference(): boolean {
    return typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function Home() {
    const { t } = useTranslation(['common']);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(getReducedMotionPreference);
    const [isRotationRequested, setIsRotationRequested] = useState(() => !getReducedMotionPreference());
    const [hasInteractionPausedRotation, setHasInteractionPausedRotation] = useState(false);
    const [activePillarIndex, setActivePillarIndex] = useState(0);
    const [slideAnnouncement, setSlideAnnouncement] = useState('');
    const isRotationEnabled = isRotationRequested && !hasInteractionPausedRotation && !prefersReducedMotion;

    useEffect(() => {
        if (typeof window.matchMedia !== 'function') return;

        const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        function updateMotionPreference() {
            setPrefersReducedMotion(reducedMotionQuery.matches);
            if (reducedMotionQuery.matches) {
                setIsRotationRequested(false);
            }
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
            setActivePillarIndex((currentIndex) => (currentIndex + 1) % valuePillars.length);
        }, rotationInterval);

        return () => {
            window.clearInterval(rotationTimer);
        };
    }, [isRotationEnabled]);

    function moveToPillar(direction: -1 | 1) {
        const nextIndex = (activePillarIndex + direction + valuePillars.length) % valuePillars.length;
        const nextPillarTitle = t(`homePage.${valuePillars[nextIndex]}Title`);

        setActivePillarIndex(nextIndex);
        setSlideAnnouncement(t('homePage.slideAnnouncement', {
            current: nextIndex + 1,
            total: valuePillars.length,
            title: nextPillarTitle,
        }));
    }

    return (
        <div className="homePage">
            <section className="homeHero" aria-labelledby="home-title">
                <p className="homeEyebrow">{t('homePage.eyebrow')}</p>
                <h1 id="home-title">{t('homePage.title')}</h1>
                <p className="homeLead">{t('homePage.lead')}</p>
                <p className="homeIntro">{t('homePage.intro')}</p>
            </section>

            <section className="valueSection" aria-labelledby="values-title">
                <div className="sectionIntro">
                    <h2 id="values-title">{t('homePage.valuesTitle')}</h2>
                    <p>{t('homePage.valuesIntro')}</p>
                </div>
                <div className="valueCards valueCardsStatic">
                    {valuePillars.map((pillar) => (
                        <article className={`valueCard valueCard-${pillar}`} key={pillar}>
                            <h3>{t(`homePage.${pillar}Title`)}</h3>
                            <p>{t(`homePage.${pillar}Body`)}</p>
                        </article>
                    ))}
                </div>
                <div
                    className="valueCarouselMotion"
                    role="group"
                    aria-labelledby="values-title"
                    aria-roledescription={t('homePage.carouselRoleDescription')}
                    onFocusCapture={() => {
                        setHasInteractionPausedRotation(true);
                    }}
                    onPointerEnter={() => {
                        setHasInteractionPausedRotation(true);
                    }}
                >
                    <div className="valueCarouselControls">
                        <button
                            type="button"
                            aria-controls="value-carousel-slides"
                            onClick={() => {
                                if (isRotationRequested) {
                                    setIsRotationRequested(false);
                                } else {
                                    setHasInteractionPausedRotation(false);
                                    setIsRotationRequested(true);
                                }
                            }}
                        >
                            {t(isRotationRequested ? 'homePage.pauseRotation' : 'homePage.resumeRotation')}
                        </button>
                        <button type="button" aria-controls="value-carousel-slides" onClick={() => {
                            moveToPillar(-1);
                        }}>
                            {t('homePage.previousValue')}
                        </button>
                        <span className="valueCarouselPosition" aria-hidden="true">
                            {activePillarIndex + 1} / {valuePillars.length}
                        </span>
                        <button type="button" aria-controls="value-carousel-slides" onClick={() => {
                            moveToPillar(1);
                        }}>
                            {t('homePage.nextValue')}
                        </button>
                    </div>
                    <div className="valueCarouselViewport" id="value-carousel-slides" aria-live="off">
                        {valuePillars.map((pillar, index) => (
                            <div
                                className={`valueCard valueCard-${pillar} valueCarouselSlide`}
                                key={pillar}
                                hidden={activePillarIndex !== index}
                                role="group"
                                aria-roledescription={t('homePage.slideRoleDescription')}
                                aria-label={t('homePage.slidePosition', {
                                    current: index + 1,
                                    total: valuePillars.length,
                                })}
                            >
                                <h3>{t(`homePage.${pillar}Title`)}</h3>
                                <p>{t(`homePage.${pillar}Body`)}</p>
                            </div>
                        ))}
                    </div>
                    <p className="valueCarouselAnnouncement" role="status" aria-live="polite" aria-atomic="true">
                        {slideAnnouncement}
                    </p>
                </div>
            </section>

            <section className="homeMethod" aria-labelledby="method-title">
                <div className="sectionIntro">
                    <h2 id="method-title">{t('homePage.methodTitle')}</h2>
                    <p>{t('homePage.methodIntro')}</p>
                </div>
                <div className="homeMethodSteps">
                    {(['need', 'response', 'benefit'] as const).map((step) => (
                        <div className="homeMethodStep" key={step}>
                            <h3>{t(`homePage.${step}Title`)}</h3>
                            <p>{t(`homePage.${step}Body`)}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="homeRecord" aria-labelledby="record-title">
                <div>
                    <p className="homeEyebrow">{t('archivePage.title')}</p>
                    <h2 id="record-title">{t('homePage.recordTitle')}</h2>
                    <p>{t('homePage.recordBody')}</p>
                </div>
                <div className="homeLinks">
                    <Link className="homeLink homeLinkPrimary" to={`/${t('archivePath')}`}>
                        {t('homePage.archiveLink')}
                    </Link>
                    <Link className="homeLink" to={`/${t('aboutPath')}`}>
                        {t('homePage.foundationsLink')}
                    </Link>
                </div>
            </section>

            <section className="homeDevelopment" aria-labelledby="development-title">
                <p className="developmentBadge">{t('inDevelopment')}</p>
                <h2 id="development-title">{t('homePage.developmentTitle')}</h2>
                <p>{t('homePage.developmentBody')}</p>
            </section>
        </div>
    );
}

export default Home;
