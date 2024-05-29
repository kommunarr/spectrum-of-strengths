import { useTranslation } from "react-i18next";

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
                <p dangerouslySetInnerHTML={{__html: t(`${section}Body`)}}></p>
              </div>
            ))}
        </div>
    );
}

export default TermsOfUseAndPrivacy;