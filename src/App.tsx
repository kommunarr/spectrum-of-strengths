import { RouterProvider, createHashRouter } from 'react-router-dom'
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

const routeObject: RouteObject = {
  path: "/",
  // <Root />
  element: <Layout />,
  errorElement: <Layout outlet={<ErrorPage />} />,
  children: [
    { index: true, element: <LanguageLoader lang="en" title="homePage.title"><Home /></LanguageLoader> },
    {
      path: "events",
      element: <LanguageLoader lang="en" title="events"><Events /></LanguageLoader>,
    },
    {
      path: "about",
      element: <LanguageLoader lang="en" title="about"><About /></LanguageLoader>,
    },
    {
      path: "archive",
      element: <LanguageLoader lang="en" title="archive"><Archive /></LanguageLoader>,
    },
    {
      path: "glossary",
      element: <LanguageLoader lang="en" title="glossary"><Glossary /></LanguageLoader>,
    },
    {
      path: "contact-us",
      element: <LanguageLoader lang="en" title="contact"><Contact /></LanguageLoader>,
    },
    {
      path: "terms-of-use-and-privacy",
      element: <LanguageLoader lang="en" title="termsOfUseAndPrivacy"><TermsOfUseAndPrivacy /></LanguageLoader>
    },
    {
      path: "accessibility-standards",
      element: <LanguageLoader lang="en" title="accessibilityStandards"><AccessibilityStandards /></LanguageLoader>,
    },
    {
      path: 'fr',
      children: [
        { index: true, element: <LanguageLoader lang="fr" title="homePage.title"><Home /></LanguageLoader> },
        {
          path: "événements",
          element: <LanguageLoader lang="fr" title="events"><Events /></LanguageLoader>,
        },
        {
          path: "propos",
          element: <LanguageLoader lang="fr" title="about"><About /></LanguageLoader>,
        },
        {
          path: "archives",
          element: <LanguageLoader lang="fr" title="archive"><Archive /></LanguageLoader>,
        },
        {
          path: "glossaire",
          element: <LanguageLoader lang="fr" title="glossary"><Glossary /></LanguageLoader>,
        },
        {
          path: "contactez-nous",
          element: <LanguageLoader lang="fr" title="contact"><Contact /></LanguageLoader>,
        },
        {
          path: "conditions-dutilisation-politique-confidentialite",
          element: <LanguageLoader lang="fr" title="termsOfUseAndPrivacy"><TermsOfUseAndPrivacy /></LanguageLoader>,
        },
        {
          path: "normes-daccessibilite",
          element: <LanguageLoader lang="fr" title="accessibilityStandards"><AccessibilityStandards /></LanguageLoader>,
        }
      ]
    }
  ]
};

const router = createHashRouter([routeObject]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

export default App;
