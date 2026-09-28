import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import * as Utils from "../../utils";
import { updateMetaDescription } from '../../utils/pageMetadata';
import './ErrorPage.css';

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
        let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
        if (!robots) {
            robots = document.createElement('meta');
            robots.name = 'robots';
            document.head.append(robots);
        }
        robots.content = 'noindex';
    }, [t, language]);

    return (
        <div className="notFoundPage">
            <h1>{t('pageNotFoundTitle')}</h1>
            <p>{t('pageNotFoundSubtitle')}</p>
            <Link className="notFoundHomeLink" to={Utils.publishedRoute(t('homePath'))}>
                {t('pageNotFoundHomeLink')}
            </Link>
        </div>
    );
}

export default ErrorPage;
