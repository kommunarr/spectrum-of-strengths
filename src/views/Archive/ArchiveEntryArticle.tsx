import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { publishedRoute } from '../../utils/publishedRoute';
import { formatPublicationDate } from '../../utils/archiveDate';

type ArchiveCategory = 'heritage' | 'research' | 'experience' | 'gaps' | 'progress';
type ArchiveStatus = 'planned' | 'inProgress' | 'confirmed';

export interface ArchiveEntry {
    id: string;
    publicationDate: string;
    sourceDateTime?: string;
    category: ArchiveCategory;
    status: ArchiveStatus;
    title: string;
    summary: string;
    body?: string[];
    need?: string;
    proposedResponse?: string;
    potentialValue?: string;
    sourceContext?: string;
    sourceUrl?: string;
}

export default function ArchiveEntryArticle({ entry, standalone = false }: {
    entry: ArchiveEntry;
    standalone?: boolean;
}) {
    const { t, i18n } = useTranslation(['common']);
    const dateLanguage = i18n.resolvedLanguage === 'fr' ? 'fr-CA' : 'en-CA';
    const entryPath = publishedRoute(`${t('archivePath')}/${entry.id}`);

    return (
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
            {standalone ? <h1>{entry.title}</h1> : (
                <h3><Link to={entryPath}>{entry.title}</Link></h3>
            )}
            <p>{entry.summary}</p>
            {standalone && entry.body && (
                <div className="archiveEntryBody">
                    {entry.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                </div>
            )}
            {!standalone && entry.body && (
                <p className="archiveEntryReadMore">
                    <Link to={entryPath}>{t('archivePage.readFullEntry')}</Link>
                </p>
            )}
            {entry.need && entry.proposedResponse && entry.potentialValue && (
                <dl className="archiveEntryCase">
                    <div>
                        <dt>{t('archivePage.needLabel')}</dt>
                        <dd>{entry.need}</dd>
                    </div>
                    <div>
                        <dt>{t('archivePage.responseLabel')}</dt>
                        <dd>{entry.proposedResponse}</dd>
                    </div>
                    <div>
                        <dt>{t('archivePage.valueLabel')}</dt>
                        <dd>{entry.potentialValue}</dd>
                    </div>
                </dl>
            )}
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
    );
}
