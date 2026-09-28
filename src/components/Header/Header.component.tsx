import { Link, useLocation } from "react-router-dom";
import type { RefObject } from 'react';
import './Header.css';
import Logo from "../Logo";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import NavMenu from "../NavMenu";
import * as Utils from "../../utils";

interface IHeader {
  toggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  mobileMenuTriggerRef: RefObject<HTMLButtonElement>;
}

function Header(props: IHeader) {
  const { t, i18n } = useTranslation(['common', 'otherLanguage']);
    const location = useLocation();
    const languageLinkLocation = Utils.getCorrespondingPageRouteInOtherLanguage(t, i18n, location.pathname);
    const otherLanguageKey = i18n.resolvedLanguage === 'en' ? 'fr' : 'en'

    return (
      <header id="header">
        <div className="topRow">

          <Logo />

          <div className="actionSection">
            <Link className="actionLink languageLink" to={Utils.publishedRoute(languageLinkLocation)} lang={otherLanguageKey}>
              {t('name', { ns: 'otherLanguage' })}
            </Link>
            <button
              className="mobileMenuTrigger"
              type="button"
              aria-label={props.isMobileMenuOpen ? t('close') : t('menu')}
              aria-expanded={props.isMobileMenuOpen}
              aria-controls="mobile-navigation"
              ref={props.mobileMenuTriggerRef}
              onClick={props.toggleMobileMenu}
            >
              <FontAwesomeIcon aria-hidden="true" className="mobileMenuTriggerIcon" icon={props.isMobileMenuOpen ? faXmark : faBars} />
            </button>
          </div>
        </div>
        <div className="bottomRow">
          <div className="bottomRowContent">
            <NavMenu />
          </div>
        </div>
      </header>
    );
}

export default Header;
