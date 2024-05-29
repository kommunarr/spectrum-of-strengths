import { Outlet, RouterProvider, createBrowserRouter, useLocation } from 'react-router-dom'
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
  title: string;
  children: React.ReactNode;
}

const routeObject: RouteObject = {
  path: "/",
  // <Root />
  element: <Layout />,
  errorElement: <Layout outlet={<ErrorPage />} />,
  children: [
    { index: true, element: <LanguageLoader lang="en" title="home"><Home /></LanguageLoader> },
    {
      path: "events",
      element: <LanguageLoader lang="en" title="events"><Events /></LanguageLoader>,
    },
    {
      path: "about",
      element: <LanguageLoader lang="en" title="about"><About /></LanguageLoader>,
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
        { index: true, element: <LanguageLoader lang="fr" title="home"><Home /></LanguageLoader> },
        {
          path: "événements",
          element: <LanguageLoader lang="fr" title="events"><Events /></LanguageLoader>,
        },
        {
          path: "propos",
          element: <LanguageLoader lang="fr" title="about"><About /></LanguageLoader>,
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

const router = createBrowserRouter([routeObject]);
function LanguageLoader(props: ILanguageLoader) {
  const { t, i18n } = useTranslation(['common']);
  const { pathname } = useLocation();
  const title = t(props.title)
  
  useEffect(() => {
    void i18n.changeLanguage(props.lang);
    document.title = `${title} | Spectrum of Strengths`;

    // scroll to top on route change
    window.scrollTo(0, 0);
  }, [props.lang, props.title, title, i18n, pathname]);

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
