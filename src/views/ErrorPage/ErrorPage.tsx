import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import * as Utils from "../../utils";
import { updateMetaDescription } from '../../utils/pageMetadata';

function ErrorPage() {
    const { t, i18n } = useTranslation(['common']);
    const location = useLocation();
    const language = Utils.getLanguageForPath(location.pathname);

    useEffect(() => {
        void i18n.changeLanguage(language);
        document.documentElement.lang = language;
    }, [i18n, language]);

    useEffect(() => {
        document.title = `${t('pageNotFoundTitle')} | ${t('organizationName')}`;
        updateMetaDescription(t('pageNotFoundDescription'));
    }, [t, language]);

    return (
        <div>
            <h1>{t('pageNotFoundTitle')}</h1>
            <p>{t('pageNotFoundSubtitle')}</p>
        </div>
    );
}

export default ErrorPage;
