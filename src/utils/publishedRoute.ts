export function publishedRoute(path: string): string {
    const normalized = path.replace(/^\/+|\/+$/g, '');
    return normalized ? `/${normalized}/` : '/';
}
