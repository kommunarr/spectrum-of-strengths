import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { publishedRoute } from '../../utils/publishedRoute';
import ArchiveEntryArticle from './ArchiveEntryArticle';
import type { ArchiveEntry } from './ArchiveEntryArticle';
import '../contentPages.css';
import './Archive.css';

export default function ArchiveEntryPage({ entryId }: { entryId: string }) {
    const { t } = useTranslation(['common']);
    const entries = t('archivePage.entries', { returnObjects: true }) as ArchiveEntry[];
    const entry = entries.find((item) => item.id === entryId);
    if (!entry) throw new Error(`Archive entry not found: ${entryId}`);

    return (
        <div className="archiveEntryPage">
            <p className="archiveEntryBack">
                <Link to={publishedRoute(t('archivePath'))}>{t('archivePage.backToArchive')}</Link>
            </p>
            <ArchiveEntryArticle entry={entry} standalone />
        </div>
    );
}
