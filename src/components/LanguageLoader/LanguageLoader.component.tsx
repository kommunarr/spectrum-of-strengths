import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import React from 'react';
import { updatePageMetadata } from '../../utils/pageMetadata';

interface ILanguageLoader {
    lang: 'en' | 'fr';
    title: string;
    description: string;
    children: React.ReactNode;
  }
  
  function LanguageLoader(props: ILanguageLoader) {
    const { i18n } = useTranslation(['common']);
    const { pathname } = useLocation();
    const fixedT = i18n.getFixedT(props.lang, 'common');
    const title = fixedT(props.title);
    const description = fixedT(props.description);
    const organizationName = fixedT('organizationName');
    
    useEffect(() => {
      void i18n.changeLanguage(props.lang);
      document.documentElement.lang = props.lang;
      updatePageMetadata({
        description,
        language: props.lang,
        pathname,
        title: `${title} | ${organizationName}`,
      });
  
      // scroll to top on route change
      window.scrollTo(0, 0);
    }, [props.lang, props.title, title, props.description, description, organizationName, i18n, pathname]);
  
    return (props.children)
  }

  export default LanguageLoader;
