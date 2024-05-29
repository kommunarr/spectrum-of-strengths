import { useTranslation } from "react-i18next";

function AccessibilityStandards() {
    const { t } = useTranslation(['common']);
    const sections = ['accessibilityDocumentAvailabilityNote', 'accessibilityPracticesAndProcedures', 'accessibilityCommunication', 'accessibilityWebContent', 'accessibilityFeedbackProcess'];
    return (
        <div>
            <h1>{t('accessibilityStandards')}</h1>
            <p dangerouslySetInnerHTML={{__html: t('accessibilityStandardsBody')}}></p>
            {sections.map((section, index) => (
                <div key={index}>
                  <h2>{t(`${section}Title`)}</h2>
                  <p dangerouslySetInnerHTML={{__html: t(`${section}Body`)}}></p>
                </div>
            ))}
        </div>
    );
}

export default AccessibilityStandards;