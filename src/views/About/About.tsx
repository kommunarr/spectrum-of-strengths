import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../contentPages.css';

const foundationSections = ['origins', 'purpose', 'contributors', 'embodiment'];

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

            <p className="foundationGlossaryLink">
                <Link to={`/${t('glossaryPath')}`}>{t('foundationsPage.termsLink')}</Link>
            </p>
        </article>
    );
}

export default About;
