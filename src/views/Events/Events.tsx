import { useTranslation } from "react-i18next";

function Events() {
    const { t } = useTranslation(['common', 'events']);
    return (
        <div className="events">
            <h1>{t('events')}</h1>
            <h2>{t('officialTitle', { ns: 'events' })}</h2>
            <ul>
                <li>
                    <p>{t('officialName', { ns: 'events' })}</p>
                    <p>{t('officialDescription', { ns: 'events' })}</p>
                </li>
            </ul>
            <h2>{t('partnerTitle', { ns: 'events' })}</h2>
            <ul>
                <li>
                    <a target="_blank" rel="noreferrer" href={t('partnerUrl', { ns: 'events' })}>{t('partnerName', { ns: 'events' })}</a>
                    <p>{t('partnerDescription', { ns: 'events' })}</p>
                </li>
            </ul>
        </div>
    );
}

export default Events;
