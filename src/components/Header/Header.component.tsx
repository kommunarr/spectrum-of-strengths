import { Link, useLocation } from "react-router-dom";
import './Header.css';
import Logo from "../Logo";
import { useTranslation } from "react-i18next";

function Header() {
  const { t, i18n } = useTranslation(['common', 'otherLanguage']);
    function openAddEmailPrompt() {
      console.log('Email collected');
    }

    function getCorrespondingPageRouteInOtherLanguage(path: string): string {
      const isValidPath = i18n.exists(path, { ns: 'otherLanguage' });
      const key = isValidPath ? path : `/${t('homePath')}`;
      return t(key, { ns: 'otherLanguage' });
    }

    const location = useLocation();

    return (
        <>
          <div id="header">
            <Logo />
    
            <nav className="navigationMenu">
              <ul className="navigationMenuHeadings">
                <li>
                  <Link className="actionLink" to={t('homePath')}>{t('home')}</Link>
                </li>
                <li>
                  <Link className="actionLink" to={t('aboutPath')}>{t('about')}</Link>
                </li>
                <li>
                  <Link className="actionLink" to={t('contactPath')}>{t('contact')}</Link>
                </li>
              </ul>
            </nav>
    
            <div className="actionSection">
              <Link className="actionLink languageLink" to={getCorrespondingPageRouteInOtherLanguage(location.pathname)}>
                {t('name', { ns: 'otherLanguage' })}
              </Link>
              <button className="actionButton" onClick={openAddEmailPrompt}>
                {t('join')}
              </button>
            </div>
          </div>
        </>
    );
}

export default Header;