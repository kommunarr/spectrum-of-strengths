const localChrome = process.env.CHROME_PATH
  ? { chromePath: process.env.CHROME_PATH }
  : {};

module.exports = {
  ci: {
    collect: {
      ...localChrome,
      startServerCommand: 'npm run preview -- --host 127.0.0.1 --port 4173',
      startServerReadyPattern: 'Local:',
      url: [
        'http://127.0.0.1:4173/spectrum-of-strengths/',
        'http://127.0.0.1:4173/spectrum-of-strengths/#/events',
        'http://127.0.0.1:4173/spectrum-of-strengths/#/fr',
        'http://127.0.0.1:4173/spectrum-of-strengths/#/fr/événements',
      ],
      numberOfRuns: 1,
      settings: {
        chromeFlags: '--no-sandbox',
        preset: 'desktop',
      },
    },
    assert: {
      assertions: {
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:seo': ['warn', { minScore: 0.85 }],
        'meta-description': 'error',
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-reports',
    },
  },
};
