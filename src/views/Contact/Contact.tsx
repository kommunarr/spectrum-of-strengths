import { useTranslation } from 'react-i18next';
import '../contentPages.css';
import '../developmentPage.css';

function Contact() {
    const { t } = useTranslation(['common']);

    return (
        <article className="developmentPage">
            <p className="developmentBadge">{t('inDevelopment')}</p>
            <h1>{t('contact')}</h1>
            <p>{t('developmentsPage.contactBody')}</p>
        </article>
    );
}

export default Contact;
