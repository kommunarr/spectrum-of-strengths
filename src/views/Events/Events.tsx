import { useTranslation } from "react-i18next";

function Events() {
    const { t } = useTranslation(['common']);
    return (
        <div>
            <h1>{t('events')}</h1>
            <a href="https://duckduckgo.com/">Website</a>
        </div>
    );
}

export default Events;