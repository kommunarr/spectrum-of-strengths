import { useTranslation } from "react-i18next";
import TranslatedHtml from "../../components/TranslatedHtml";

function TermsOfUseAndPrivacy() {
    const { t } = useTranslation(['common']);
    const sections = ['officialLanguagesNotice', 'copyrightAndPermissionToReproduce', 'commercialReproduction', 'nonCommercialReproduction', 'hyperlinking'];
    return (
        <div>
            <h1>{t('termsOfUseAndPrivacy')}</h1>
            <p>{t('termsOfUseBody')}</p>
            {sections.map((section, index) => (
                <div key={index}>
                <h2>{t(`${section}Title`)}</h2>
                <TranslatedHtml html={t(`${section}Body`)} />
              </div>
            ))}
        </div>
    );
}

export default TermsOfUseAndPrivacy;
