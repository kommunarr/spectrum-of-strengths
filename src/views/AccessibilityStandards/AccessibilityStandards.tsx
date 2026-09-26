import { useTranslation } from 'react-i18next';
import '../contentPages.css';
import '../TermsOfUseAndPrivacy/PolicyPages.css';

function AccessibilityStandards() {
    const { t } = useTranslation(['common']);

    return (
        <article className="policyPage">
            <header className="contentPageHeader">
                <h1>{t('accessibilityStandards')}</h1>
                <p>{t('accessibilityPage.intro')}</p>
            </header>
            <section>
                <h2>{t('accessibilityPage.reviewTitle')}</h2>
                <p>{t('accessibilityPage.reviewBody')}</p>
            </section>
        </article>
    );
}

export default AccessibilityStandards;
