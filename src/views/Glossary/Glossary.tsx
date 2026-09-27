import { useTranslation } from 'react-i18next';
import '../contentPages.css';

const glossaryTerms = [
    'heritage',
    'leadership',
    'systems',
    'gapFinding',
    'gapBridging',
    'capture',
    'transformation',
    'creation',
    'preservation',
    'livingLab',
];

function Glossary() {
    const { t } = useTranslation(['common']);

    return (
        <article className="glossaryPage">
            <header className="contentPageHeader">
                <p className="homeEyebrow">{t('homePage.eyebrow')}</p>
                <h1>{t('glossaryPage.title')}</h1>
                <p>{t('glossaryPage.intro')}</p>
            </header>

            <dl className="glossaryList">
                {glossaryTerms.map((term) => (
                    <div key={term}>
                        <dt>{t(`glossaryPage.${term}Title`)}</dt>
                        <dd>{t(`glossaryPage.${term}Body`)}</dd>
                    </div>
                ))}
            </dl>
        </article>
    );
}

export default Glossary;
