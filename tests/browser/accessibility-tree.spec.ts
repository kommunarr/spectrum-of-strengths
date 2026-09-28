import { expect, test, type Page } from '@playwright/test';

async function accessibilityNodes(page: Page) {
  const session = await page.context().newCDPSession(page);
  try {
    const tree = await session.send('Accessibility.getFullAXTree');
    return tree.nodes.filter((node) => !node.ignored);
  } finally {
    await session.detach();
  }
}

function hasStatusText(nodes: Awaited<ReturnType<typeof accessibilityNodes>>, text: string) {
  const byId = new Map(nodes.map((node) => [node.nodeId, node]));
  return nodes.some((node) => node.role?.value === 'status' && node.childIds?.some(
    (childId) => byId.get(childId)?.name?.value === text,
  ));
}

for (const route of [
  {
    path: './',
    language: 'en',
    navigation: 'Primary navigation',
    event: 'Events',
    status: 'In development',
    carousel: 'Four ways of thinking about value',
    next: 'Next value',
    announcement: 'Value transformation, 2 of 4',
  },
  {
    path: 'fr/',
    language: 'fr',
    navigation: 'Navigation principale',
    event: 'Événements',
    status: 'En développement',
    carousel: 'Quatre façons de penser la valeur',
    next: 'Valeur suivante',
    announcement: 'Transformation de la valeur, 2 sur 4',
  },
] as const) {
  test(`exposes useful accessibility-tree names and announcements in ${route.language}`, async ({ page }) => {
    await page.clock.install();
    await page.goto(route.path);
    await expect(page.locator('html')).toHaveAttribute('lang', route.language);

    const initial = await accessibilityNodes(page);
    expect(initial.some((node) => node.role?.value === 'banner')).toBe(true);
    expect(initial.some((node) => node.role?.value === 'main')).toBe(true);
    expect(initial.some((node) => node.role?.value === 'contentinfo')).toBe(true);
    expect(initial.some((node) => node.role?.value === 'navigation' && node.name?.value === route.navigation)).toBe(true);
    expect(initial.some((node) => node.role?.value === 'heading' && node.properties?.some(
      (property) => property.name === 'level' && property.value.value === 1,
    ))).toBe(true);
    expect(initial.some((node) => node.role?.value === 'group' && node.name?.value === route.carousel)).toBe(true);
    expect(initial.some((node) => node.role?.value === 'link' && node.name?.value === route.event &&
      node.description?.value === route.status)).toBe(true);
    expect(hasStatusText(initial, route.announcement)).toBe(false);

    await page.clock.fastForward(28_000);
    expect(hasStatusText(await accessibilityNodes(page), route.announcement)).toBe(false);

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang', route.language);
    await page.getByRole('group', { name: route.carousel }).getByRole('button', { name: route.next }).click();
    await expect(page.getByRole('status')).toHaveText(route.announcement);
    const selected = await accessibilityNodes(page);
    expect(hasStatusText(selected, route.announcement)).toBe(true);
  });
}

for (const route of [
  {
    path: 'archive/',
    language: 'en',
    carousel: 'What the record will include',
    next: 'Next theme',
    announcement: 'Research and evidence, 2 of 5',
    staticHeading: 'Heritage and systems',
  },
  {
    path: 'fr/archives/',
    language: 'fr',
    carousel: 'Ce que le dossier réunira',
    next: 'Thème suivant',
    announcement: 'Recherche et données probantes, 2 sur 5',
    staticHeading: 'Patrimoine et systèmes',
  },
] as const) {
  test(`exposes archive themes and manual announcements in ${route.language}`, async ({ page }) => {
    await page.goto(route.path);
    await expect(page.locator('html')).toHaveAttribute('lang', route.language);

    const initial = await accessibilityNodes(page);
    expect(initial.some((node) => node.role?.value === 'group' && node.name?.value === route.carousel)).toBe(true);
    expect(hasStatusText(initial, route.announcement)).toBe(false);

    await page.getByRole('group', { name: route.carousel }).getByRole('button', { name: route.next }).click();
    await expect(page.getByRole('status')).toHaveText(route.announcement);
    expect(hasStatusText(await accessibilityNodes(page), route.announcement)).toBe(true);

    await page.emulateMedia({ reducedMotion: 'reduce' });
    const reducedMotion = await accessibilityNodes(page);
    expect(reducedMotion.some((node) => node.role?.value === 'group' && node.name?.value === route.carousel)).toBe(false);
    expect(reducedMotion.some((node) => node.role?.value === 'heading' && node.name?.value === route.staticHeading)).toBe(true);
  });
}
