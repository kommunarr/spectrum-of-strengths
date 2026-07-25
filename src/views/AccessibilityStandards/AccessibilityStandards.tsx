import { useTranslation } from "react-i18next";
import TranslatedHtml from "../../components/TranslatedHtml";

function AccessibilityStandards() {
    const { t } = useTranslation(['common']);
    const sections = ['accessibilityDocumentAvailabilityNote', 'accessibilityPracticesAndProcedures', 'accessibilityCommunication', 'accessibilityWebContent', 'accessibilityFeedbackProcess'];
    return (
        <div>
            <h1>{t('accessibilityStandards')}</h1>
            <TranslatedHtml html={t('accessibilityStandardsBody')} />
            {sections.map((section, index) => (
                <div key={index}>
                  <h2>{t(`${section}Title`)}</h2>
                  <TranslatedHtml html={t(`${section}Body`)} />
                </div>
            ))}
        </div>
    );
}

export default AccessibilityStandards;
