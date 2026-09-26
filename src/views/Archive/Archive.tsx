import { useTranslation } from 'react-i18next';
import '../contentPages.css';
import './Archive.css';

const archiveCategories = ['heritage', 'research', 'experience', 'gaps', 'progress'] as const;

type ArchiveCategory = typeof archiveCategories[number];
type ArchiveStatus = 'planned' | 'inProgress' | 'confirmed';

interface ArchiveEntry {
    id: string;
    publicationDate: string;
    sourceDateTime?: string;
    category: ArchiveCategory;
    status: ArchiveStatus;
    title: string;
    summary: string;
    sourceContext?: string;
    sourceUrl?: string;
}

function formatPublicationDate(date: string, language: string): string {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;

    const parsedDate = new Date(`${date}T00:00:00Z`);
    if (Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== date) return date;

    return new Intl.DateTimeFormat(language, {
        dateStyle: 'long',
        timeZone: 'UTC',
    }).format(parsedDate);
}

function Archive() {
    const { t, i18n } = useTranslation(['common']);
    const entries = (t('archivePage.entries', { returnObjects: true }) as ArchiveEntry[])
        .slice()
        .sort((left, right) => right.publicationDate.localeCompare(left.publicationDate));
    const dateLanguage = i18n.resolvedLanguage === 'fr' ? 'fr-CA' : 'en-CA';

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
            </section>

            <section className="archiveEntries" aria-labelledby="archive-entries-title">
                <h2 className="archiveSectionTitle" id="archive-entries-title">
                    {t('archivePage.entriesTitle')}
                </h2>
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
                                <article className="archiveEntry">
                                    <div className="archiveEntryMeta">
                                        <span>{t(`archivePage.${entry.category}Title`)}</span>
                                        <span>{t(`archivePage.${entry.status}Status`)}</span>
                                        <span>
                                            {t('archivePage.publishedLabel')}:{' '}
                                            <time dateTime={entry.publicationDate}>
                                                {formatPublicationDate(entry.publicationDate, dateLanguage)}
                                            </time>
                                        </span>
                                        {entry.sourceDateTime && (
                                            <span>
                                                {t('archivePage.sourceDateLabel')}:{' '}
                                                <time dateTime={entry.sourceDateTime}>{entry.sourceDateTime}</time>
                                            </span>
                                        )}
                                    </div>
                                    <h3>{entry.title}</h3>
                                    <p>{entry.summary}</p>
                                    {(entry.sourceContext !== undefined || entry.sourceUrl !== undefined) && (
                                        <p className="archiveEntrySource">
                                            <strong>{t('archivePage.sourceContextLabel')}: </strong>
                                            {entry.sourceUrl ? (
                                                <a href={entry.sourceUrl}>
                                                    {entry.sourceContext ?? t('archivePage.sourceLinkLabel')}
                                                </a>
                                            ) : entry.sourceContext}
                                        </p>
                                    )}
                                </article>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </article>
    );
}

export default Archive;
