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
                    <p>
                        {t(`privacyPage.${section}Body`)}
                        {section === 'details' && (
                            <>
                                {' '}
                                <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages">
                                    {t('privacyPage.detailsLinkLabel')}
                                </a>
                            </>
                        )}
                    </p>
                </section>
            ))}
        </article>
    );
}

export default TermsOfUseAndPrivacy;
