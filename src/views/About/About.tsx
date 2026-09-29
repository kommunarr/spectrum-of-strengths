import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { publishedRoute } from '../../utils/publishedRoute';
import '../contentPages.css';

const foundationSections = ['origins', 'purpose', 'contributors', 'relationships', 'embodiment'];

function About() {
    const { t } = useTranslation(['common']);

    return (
        <article className="foundationPage">
            <header className="contentPageHeader">
                <p className="homeEyebrow">{t('homePage.eyebrow')}</p>
                <h1>{t('foundationsPage.title')}</h1>
                <p>{t('foundationsPage.intro')}</p>
            </header>

            <div className="foundationSections">
                {foundationSections.map((section) => (
                    <section key={section} aria-labelledby={`${section}-title`}>
                        <h2 id={`${section}-title`}>{t(`foundationsPage.${section}Title`)}</h2>
                        <p>{t(`foundationsPage.${section}Body`)}</p>
                    </section>
                ))}
            </div>

            <div className="foundationRelatedLinks">
                <Link to={publishedRoute(t('archivePath'))}>{t('foundationsPage.archiveLink')}</Link>
                <Link to={publishedRoute(t('glossaryPath'))}>{t('foundationsPage.termsLink')}</Link>
            </div>
        </article>
    );
}

export default About;
