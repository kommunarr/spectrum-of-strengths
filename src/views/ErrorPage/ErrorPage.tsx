import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

function ErrorPage() {
    const { t, i18n } = useTranslation(['common']);
    const location = useLocation();

    // handle attempted French page navigation
    if (location.pathname.startsWith('/fr/')) {
        void i18n.changeLanguage('fr');
    }

    return (
        <div>
            <h1>{t('pageNotFoundTitle')}</h1>
            <p>{t('pageNotFoundSubtitle')}</p>
        </div>
    );
}

export default ErrorPage;