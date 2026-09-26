import { useTranslation } from 'react-i18next';
import '../contentPages.css';
import '../developmentPage.css';

function Events() {
    const { t } = useTranslation(['common']);

    return (
        <article className="developmentPage">
            <p className="developmentBadge">{t('inDevelopment')}</p>
            <h1>{t('events')}</h1>
            <p>{t('developmentsPage.eventsBody')}</p>
        </article>
    );
}

export default Events;
