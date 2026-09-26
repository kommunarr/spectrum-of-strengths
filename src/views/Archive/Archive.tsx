import { useTranslation } from 'react-i18next';
import '../contentPages.css';
import './Archive.css';

const archiveCategories = ['heritage', 'research', 'experience', 'gaps', 'progress'];

function Archive() {
    const { t } = useTranslation(['common']);

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

            <section className="archiveEmpty" aria-labelledby="archive-empty-title" role="status">
                <h2 id="archive-empty-title">{t('archivePage.emptyTitle')}</h2>
                <p>{t('archivePage.emptyBody')}</p>
                <p className="archiveDateNote">{t('archivePage.dateNote')}</p>
            </section>
        </article>
    );
}

export default Archive;
