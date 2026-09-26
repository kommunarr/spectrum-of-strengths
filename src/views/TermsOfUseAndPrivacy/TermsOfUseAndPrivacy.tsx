import { useTranslation } from 'react-i18next';
import '../contentPages.css';
import './PolicyPages.css';

const privacySections = ['submissions', 'external', 'languages', 'details'];

function TermsOfUseAndPrivacy() {
    const { t } = useTranslation(['common']);

    return (
        <article className="policyPage">
            <header className="contentPageHeader">
                <h1>{t('termsOfUseAndPrivacy')}</h1>
                <p>{t('privacyPage.intro')}</p>
            </header>
            {privacySections.map((section) => (
                <section key={section}>
                    <h2>{t(`privacyPage.${section}Title`)}</h2>
                    <p>{t(`privacyPage.${section}Body`)}</p>
                </section>
            ))}
        </article>
    );
}

export default TermsOfUseAndPrivacy;
