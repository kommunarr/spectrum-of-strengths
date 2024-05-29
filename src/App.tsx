import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import type { RouteObject } from "react-router-dom";
import './App.css'
import Home from './views/Home/Home';
import About from './views/About//About';
import Contact from './views/Contact/Contact';

import React, { useEffect } from 'react';
import ErrorPage from './views/ErrorPage/ErrorPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Events from './views/Events/Events';
import TermsOfUseAndPrivacy from './views/TermsOfUseAndPrivacy/TermsOfUseAndPrivacy';
import { useTranslation } from 'react-i18next';
import AccessibilityStandards from './views/AccessibilityStandards/AccessibilityStandards';

interface IRootRoute {
  outlet?: React.JSX.Element;
}

function Layout(props: IRootRoute) {
  return (
      <>
        <div className="headerAndMain">
          <Header />
          <main>
            {props.outlet ? props.outlet : <Outlet />}
          </main>
        </div>
        <Footer />
      </>
  );
}

interface ILanguageLoader {
  lang: string;
  children: React.ReactNode;
}

const routeObject: RouteObject = {
  path: "/",
  // <Root />
  element: <Layout />,
  errorElement: <Layout outlet={<ErrorPage />} />,
  children: [
    { index: true, element: <LanguageLoader lang="en"><Home /></LanguageLoader> },
    {
      path: "events",
      element: <LanguageLoader lang="en"><Events /></LanguageLoader>,
    },
    {
      path: "about",
      element: <LanguageLoader lang="en"><About /></LanguageLoader>,
    },
    {
      path: "contact-us",
      element: <LanguageLoader lang="en"><Contact /></LanguageLoader>,
    },
    {
      path: "terms-of-use-and-privacy",
      element: <LanguageLoader lang="en"><TermsOfUseAndPrivacy /></LanguageLoader>
    },
    {
      path: "accessibility-standards",
      element: <LanguageLoader lang="en"><AccessibilityStandards /></LanguageLoader>,
    },
    {
      path: 'fr',
      children: [
        { index: true, element: <LanguageLoader lang="fr"><Home /></LanguageLoader> },
        {
          path: "événements",
          element: <LanguageLoader lang="fr"><Events /></LanguageLoader>,
        },
        {
          path: "propos",
          element: <LanguageLoader lang="fr"><About /></LanguageLoader>,
        },
        {
          path: "contactez-nous",
          element: <LanguageLoader lang="fr"><Contact /></LanguageLoader>,
        },
        {
          path: "conditions-dutilisation-politique-confidentialite",
          element: <LanguageLoader lang="fr"><TermsOfUseAndPrivacy /></LanguageLoader>,
        },
        {
          path: "normes-daccessibilite",
          element: <LanguageLoader lang="fr"><AccessibilityStandards /></LanguageLoader>,
        }
      ]
    }
  ]
};

const router = createBrowserRouter([routeObject]);
function LanguageLoader(props: ILanguageLoader) {
  const { i18n } = useTranslation(['common']);
  
  useEffect(() => {
    const newLanguage: string = props.lang === 'fr' ? 'fr' : 'en';
    void i18n.changeLanguage(newLanguage);
  }, [props.lang, i18n]);

  return (props.children)
}

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

export default App;
