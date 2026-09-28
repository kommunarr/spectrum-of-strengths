export function formatPublicationDate(date: string, language: string): string {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;

    const parsedDate = new Date(`${date}T00:00:00Z`);
    if (Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== date) return date;

    return new Intl.DateTimeFormat(language, {
        dateStyle: 'long',
        timeZone: 'UTC',
    }).format(parsedDate);
}
