import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import React from 'react';

interface ILanguageLoader {
    lang: string;
    title: string;
    children: React.ReactNode;
  }
  
  function LanguageLoader(props: ILanguageLoader) {
    const { t, i18n } = useTranslation(['common']);
    const { pathname } = useLocation();
    const title = t(props.title)
    const organizationName = t('organizationName');
    
    useEffect(() => {
      void i18n.changeLanguage(props.lang);
      document.documentElement.lang = props.lang;
      document.title = `${title} | ${organizationName}`;
  
      // scroll to top on route change
      window.scrollTo(0, 0);
    }, [props.lang, props.title, title, organizationName, i18n, pathname]);
  
    return (props.children)
  }

  export default LanguageLoader;
