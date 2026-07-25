import type { TFunction, i18n } from 'i18next';

export type SupportedLanguage = 'en' | 'fr';

export function getLanguageForPath(path: string): SupportedLanguage {
    return path === '/fr' || path.startsWith('/fr/') ? 'fr' : 'en';
}

export function getCorrespondingPageRouteInOtherLanguage(
    t: TFunction<[string]>,
    i18n: i18n,
    path: string,
): string {
    const isValidPath = i18n.exists(path, { ns: 'otherLanguage' });
    const key = isValidPath ? path : `/${t('homePath')}`;
    return t(key, { ns: 'otherLanguage' });
}
