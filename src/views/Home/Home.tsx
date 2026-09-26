import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../contentPages.css';
import './Home.css';

const valuePillars = ['capture', 'transformation', 'creation', 'preservation'];

function Home() {
    const { t } = useTranslation(['common']);

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
                <div className="valueCards">
                    {valuePillars.map((pillar) => (
                        <article className={`valueCard valueCard-${pillar}`} key={pillar}>
                            <h3>{t(`homePage.${pillar}Title`)}</h3>
                            <p>{t(`homePage.${pillar}Body`)}</p>
                        </article>
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
                    <Link className="homeLink homeLinkPrimary" to={t('archivePath')}>
                        {t('homePage.archiveLink')}
                    </Link>
                    <Link className="homeLink" to={t('aboutPath')}>
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
