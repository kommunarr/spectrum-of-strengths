import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import type { RouteObject } from "react-router-dom";
import './App.css'
import Home from './views/Home/Home';
import About from './views/About/About';
import Contact from './views/Contact/Contact';

import React from 'react';
import ErrorPage from './views/ErrorPage/ErrorPage';
import Events from './views/Events/Events';
import Archive from './views/Archive/Archive';
import Glossary from './views/Glossary/Glossary';
import TermsOfUseAndPrivacy from './views/TermsOfUseAndPrivacy/TermsOfUseAndPrivacy';
import AccessibilityStandards from './views/AccessibilityStandards/AccessibilityStandards';
import Layout from './components/Layout';
import LanguageLoader from './components/LanguageLoader';
import CanadianEnglish from './locales/en-ca/translation.json';
import CanadianFrench from './locales/fr-ca/translation.json';

const routeObject: RouteObject = {
  path: "/",
  // <Root />
  element: <Layout />,
  errorElement: <Layout outlet={<ErrorPage />} />,
  children: [
    { index: true, element: <LanguageLoader lang="en" title="homePage.title" description="homePage.metaDescription"><Home /></LanguageLoader> },
    {
      path: "events",
      element: <LanguageLoader lang="en" title="events" description="developmentsPage.eventsMetaDescription"><Events /></LanguageLoader>,
    },
    {
      path: "about",
      element: <LanguageLoader lang="en" title="about" description="foundationsPage.metaDescription"><About /></LanguageLoader>,
    },
    {
      path: "archive",
      element: <LanguageLoader lang="en" title="archive" description="archivePage.metaDescription"><Archive /></LanguageLoader>,
    },
    {
      path: "glossary",
      element: <LanguageLoader lang="en" title="glossary" description="glossaryPage.metaDescription"><Glossary /></LanguageLoader>,
    },
    {
      path: "contact-us",
      element: <LanguageLoader lang="en" title="contact" description="developmentsPage.contactMetaDescription"><Contact /></LanguageLoader>,
    },
    {
      path: "terms-of-use-and-privacy",
      element: <LanguageLoader lang="en" title="termsOfUseAndPrivacy" description="privacyPage.metaDescription"><TermsOfUseAndPrivacy /></LanguageLoader>
    },
    {
      path: "accessibility-standards",
      element: <LanguageLoader lang="en" title="accessibilityStandards" description="accessibilityPage.metaDescription"><AccessibilityStandards /></LanguageLoader>,
    },
    {
      path: 'fr',
      children: [
        { index: true, element: <LanguageLoader lang="fr" title="homePage.title" description="homePage.metaDescription"><Home /></LanguageLoader> },
        {
          path: "événements",
          element: <LanguageLoader lang="fr" title="events" description="developmentsPage.eventsMetaDescription"><Events /></LanguageLoader>,
        },
        {
          path: "propos",
          element: <LanguageLoader lang="fr" title="about" description="foundationsPage.metaDescription"><About /></LanguageLoader>,
        },
        {
          path: "archives",
          element: <LanguageLoader lang="fr" title="archive" description="archivePage.metaDescription"><Archive /></LanguageLoader>,
        },
        {
          path: "glossaire",
          element: <LanguageLoader lang="fr" title="glossary" description="glossaryPage.metaDescription"><Glossary /></LanguageLoader>,
        },
        {
          path: "contactez-nous",
          element: <LanguageLoader lang="fr" title="contact" description="developmentsPage.contactMetaDescription"><Contact /></LanguageLoader>,
        },
        {
          path: "conditions-dutilisation-politique-confidentialite",
          element: <LanguageLoader lang="fr" title="termsOfUseAndPrivacy" description="privacyPage.metaDescription"><TermsOfUseAndPrivacy /></LanguageLoader>,
        },
        {
          path: "normes-daccessibilite",
          element: <LanguageLoader lang="fr" title="accessibilityStandards" description="accessibilityPage.metaDescription"><AccessibilityStandards /></LanguageLoader>,
        }
      ]
    }
  ]
};

// Convert old fragment bookmarks before the browser router reads the location.
if (window.location.hash.startsWith('#/')) {
  let legacyPath: string;
  try {
    legacyPath = decodeURIComponent(window.location.hash.slice(1));
  } catch {
    legacyPath = '/unknown';
  }
  const knownPaths = new Set([
    ...Object.keys(CanadianEnglish.otherLanguage),
    ...Object.keys(CanadianFrench.otherLanguage),
  ].filter((path) => path.startsWith('/')));
  const target = knownPaths.has(legacyPath) ? legacyPath : legacyPath.startsWith('/fr/') ? '/fr/unknown' : '/unknown';
  const destination = `/spectrum-of-strengths${target === '/' ? '/' : `${target}/`}${window.location.search}`;
  window.history.replaceState(window.history.state, '', destination);
}

const router = createBrowserRouter([routeObject], { basename: '/spectrum-of-strengths/' });

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

export default App;
