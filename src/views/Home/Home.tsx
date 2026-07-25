import { useTranslation } from "react-i18next";

function Home() {
    const { t } = useTranslation(['common']);
    return (
        <div>
            <h1>{t('home')}</h1>
            <p>{t('contentComingSoon')}</p>
        </div>
    );
}

export default Home;
