import { Link, useLocation } from "react-router-dom";
import './Header.css';
import Logo from "../Logo";
import { useTranslation } from "react-i18next";
import ActionButton from "../ActionButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const { t, i18n } = useTranslation(['common', 'otherLanguage']);
  let isMobileMenuOpen = false;

  function openAddEmailPrompt() {
    console.log('Email collected');
  }

  function getCorrespondingPageRouteInOtherLanguage(path: string): string {
    const isValidPath = i18n.exists(path, { ns: 'otherLanguage' });
    const key = isValidPath ? path : `/${t('homePath')}`;
    return t(key, { ns: 'otherLanguage' });
  }

  function openMobileMenu(): void {
    isMobileMenuOpen = true;
    console.log('Menu opened');
  }

    const location = useLocation();
    const currentPathname = location.pathname.substring(1);
    const pageSections = ['home', 'events', 'about', 'contact'];

    return (
      <div id="header">
        <div className="topRow">
          <Logo />

          <div className="actionSection">
            <Link className="actionLink languageLink" to={getCorrespondingPageRouteInOtherLanguage(location.pathname)}>
              {t('name', { ns: 'otherLanguage' })}
            </Link>
            <ActionButton onClick={openAddEmailPrompt} label={t('joinUs')} />
            <button className="mobileMenuTrigger" aria-label={t('menu')} onClick={openMobileMenu}>
              <FontAwesomeIcon className="mobileMenuTriggerIcon" icon={faBars} />
            </button>
          </div>
        </div>
        <div className="bottomRow">
          <div className="bottomRowContent">
            <nav className="navigationMenu">
              <ul className="navigationMenuHeadings">
                {pageSections.map((section, index) => 
                {
                  const path = t(`${section}Path`);
                  const activeClass = (currentPathname === path ? ' active' : '');
                  return (
                  <li key={index}>
                    <Link className={`actionLink${activeClass}`} to={path}>{t(section)}</Link>
                  </li>
                )})}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
}

export default Header;