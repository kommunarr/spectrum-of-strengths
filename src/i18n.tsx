import i18next from 'i18next';
import { initReactI18next } from "react-i18next";
import CanadianEnglish from "./locales/en-ca/translation.json";
import CanadianFrench from "./locales/fr-ca/translation.json";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const resources = {
  en: {
    common: CanadianEnglish.common,
    otherLanguage: CanadianEnglish.otherLanguage,
    contactUs: CanadianEnglish.contactUs,
    email: CanadianEnglish.email
  },
  fr: {
    common: CanadianFrench.common,
    otherLanguage: CanadianFrench.otherLanguage,
    contactUs: CanadianFrench.contactUs,
    email: CanadianFrench.email
  }
};
/* eslint-enable @typescript-eslint/no-unsafe-assignment */

void i18next.use(initReactI18next)
  .init({
    resources,
    lng: 'en'
  });

  export default i18next;