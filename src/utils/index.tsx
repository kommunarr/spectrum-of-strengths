import { TFunction, i18n } from "i18next";

export const navMenuSections = ['home', 'events', 'about', 'contact'];

export const getCorrespondingPageRouteInOtherLanguage = (t: TFunction<[string]>, i18n: i18n, path: string) => {
    const isValidPath = i18n.exists(path, { ns: 'otherLanguage' });
    const key = isValidPath ? path : `/${t('homePath')}`;
    return t(key, { ns: 'otherLanguage' });
  };