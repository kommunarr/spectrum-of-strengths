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
import i18n from './i18n';

interface IRootRoute {
  outlet?: React.JSX.Element;
}

function Layout(props: IRootRoute) {
  return (
      <>
        <Header />
        <main>
          {props.outlet ? props.outlet : <Outlet />}
        </main>
        <Footer />
      </>
  );
}

interface ILanguageLoader {
  lang: string;
  children: React.ReactNode;
}


function setLanguage(language: string) {
  const newLanguage: string = language === 'fr' ? 'fr' : 'en';
  if (i18n.language !== newLanguage) {
    void i18n.changeLanguage(newLanguage);
  }
}

function LanguageLoader(props: ILanguageLoader) {
  useEffect(() => {
    setLanguage(props.lang);
  }, [props.lang]);

  return (props.children)
}

const routeObject: RouteObject = {
  path: "/",
  // <Root />
  element: <Layout />,
  errorElement: <Layout outlet={<ErrorPage />} />,
  children: [
    { index: true, element: <LanguageLoader lang="en"><Home /></LanguageLoader> },
    {
      path: "about",
      element: <LanguageLoader lang="en"><About /></LanguageLoader>,
    },
    {
      path: "contact-us",
      element: <LanguageLoader lang="en"><Contact /></LanguageLoader>,
    },
    {
      path: 'fr',
      children: [
        { index: true, element: <LanguageLoader lang="fr"><Home /></LanguageLoader> },
        {
          path: "propos",
          element: <LanguageLoader lang="fr"><About /></LanguageLoader>,
        },
        {
          path: "contactez-nous",
          element: <LanguageLoader lang="fr"><Contact /></LanguageLoader>,
        },
      ]
    }
  ]
};

const router = createBrowserRouter([routeObject]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

export default App;
