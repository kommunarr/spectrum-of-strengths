import CanadianEnglish from '../locales/en-ca/translation.json' with { type: 'json' };
import CanadianFrench from '../locales/fr-ca/translation.json' with { type: 'json' };

const englishEntries = CanadianEnglish.common.archivePage.entries;
const frenchEntries = CanadianFrench.common.archivePage.entries;

export const archiveEntryRoutes = englishEntries.map((entry, englishIndex) => {
    const frenchIndex = frenchEntries.findIndex((other) => other.id === entry.id);
    if (frenchIndex < 0) throw new Error(`Missing French archive entry: ${entry.id}`);
    return {
        id: entry.id,
        englishIndex,
        frenchIndex,
        englishPath: `/${CanadianEnglish.common.archivePath}/${entry.id}`,
        frenchPath: `/${CanadianFrench.common.archivePath}/${entry.id}`,
    };
});

export function getArchiveEntryAlternatePath(path: string): string | undefined {
    const route = archiveEntryRoutes.find((entry) =>
        entry.englishPath === path || entry.frenchPath === path);
    if (!route) return undefined;
    return path === route.englishPath ? route.frenchPath : route.englishPath;
}
