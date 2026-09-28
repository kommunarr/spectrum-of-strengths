import CanadianEnglish from '../locales/en-ca/translation.json';
import CanadianFrench from '../locales/fr-ca/translation.json';

const siteRoot = 'https://kommunarr.github.io/spectrum-of-strengths/';

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string): void {
    let meta = document.querySelector<HTMLMetaElement>(selector);
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, key);
        document.head.append(meta);
    }
    meta.content = content;
}

export function updateMetaDescription(description: string): void {
    setMeta('meta[name="description"]', 'name', 'description', description);
}

export function updatePageMetadata({ description, language, pathname, title }: {
    description: string;
    language: 'en' | 'fr';
    pathname: string;
    title: string;
}): void {
    const routePath = decodeURIComponent(pathname === '/' ? '/' : pathname.replace(/\/$/, ''));
    const alternatePath = language === 'en'
        ? CanadianEnglish.otherLanguage[routePath as keyof typeof CanadianEnglish.otherLanguage]
        : CanadianFrench.otherLanguage[routePath as keyof typeof CanadianFrench.otherLanguage];
    const routeUrl = (path: string) => new URL(path === '/' ? '' : `${path.slice(1)}/`, siteRoot).href;
    const canonical = routeUrl(routePath);
    const otherUrl = typeof alternatePath === 'string' && alternatePath.startsWith('/')
        ? routeUrl(alternatePath) : canonical;

    document.title = title;
    updateMetaDescription(description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.append(canonicalLink);
    }
    canonicalLink.href = canonical;

    for (const [lang, url] of [
        ['en-CA', language === 'en' ? canonical : otherUrl],
        ['fr-CA', language === 'fr' ? canonical : otherUrl],
    ]) {
        let link = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${lang}"]`);
        if (!link) {
            link = document.createElement('link');
            link.rel = 'alternate';
            link.hreflang = lang;
            document.head.append(link);
        }
        link.href = url;
    }

    document.querySelector('meta[name="robots"]')?.remove();
}
