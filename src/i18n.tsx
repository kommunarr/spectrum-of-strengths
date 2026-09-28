import i18next from 'i18next';
import { initReactI18next } from "react-i18next";
import CanadianEnglish from "./locales/en-ca/translation.json";
import CanadianFrench from "./locales/fr-ca/translation.json";

const resources = {
  en: {
    common: CanadianEnglish.common,
    otherLanguage: CanadianEnglish.otherLanguage
  },
  fr: {
    common: CanadianFrench.common,
    otherLanguage: CanadianFrench.otherLanguage
  }
};

const initialPath = window.location.hash.startsWith('#/')
  ? window.location.hash.slice(1)
  : window.location.pathname.replace(/^\/spectrum-of-strengths/, '');
const initialLanguage = initialPath === '/fr' || initialPath.startsWith('/fr/') ? 'fr' : 'en';

void i18next.use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage
  });

  export default i18next;
