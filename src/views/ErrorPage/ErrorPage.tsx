import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function ErrorPage() {
    const { t, i18n } = useTranslation(['common']);
    const location = useLocation();

    useEffect(() => {
        // Keep an unmatched French route in French without changing language during render.
        if (location.pathname.startsWith('/fr/')) {
            void i18n.changeLanguage('fr');
            document.documentElement.lang = 'fr';
        }
    }, [i18n, location.pathname]);

    return (
        <div>
            <h1>{t('pageNotFoundTitle')}</h1>
            <p>{t('pageNotFoundSubtitle')}</p>
        </div>
    );
}

export default ErrorPage;
