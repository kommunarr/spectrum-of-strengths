import { useTranslation } from "react-i18next";

function About() {
    const { t } = useTranslation(['common']);
    return (
        <div>
            <h1>{t('about')}</h1>
            <p>{t('contentComingSoon')}</p>
        </div>
    );
}

export default About;
