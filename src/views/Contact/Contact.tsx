import { useTranslation } from "react-i18next";

function Contact() {
    const { t } = useTranslation(['common']);
    return (
        <div>
            <h1>{t('contact')}</h1>
        </div>
    );
}

export default Contact;