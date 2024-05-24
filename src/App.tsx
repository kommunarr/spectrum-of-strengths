import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import type { RouteObject } from "react-router-dom";
import './App.css'
import Home from './views/Home/Home';
import About from './views/About//About';
import Contact from './views/Contact/Contact';

import React from 'react';
import ErrorPage from './views/ErrorPage/ErrorPage';
import Header from './components/Header';
import Footer from './components/Footer';

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

const routeObject: RouteObject = {
  path: "/",
  // <Root />
  element: <Layout />,
  errorElement: <Layout outlet={<ErrorPage />} />,
  children: [
    { index: true, element: <Home /> },
    {
      path: "about",
      element: <About />,
    },
    {
      path: "contact-us",
      element: <Contact />,
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
