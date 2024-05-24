import { useTranslation } from "react-i18next";

function ErrorPage() {
    const { t } = useTranslation(['common']);
    return (
        <div>
            <h1>{t('pageNotFoundTitle')}</h1>
            <p>{t('pageNotFoundSubtitle')}</p>
        </div>
    );
}

export default ErrorPage;