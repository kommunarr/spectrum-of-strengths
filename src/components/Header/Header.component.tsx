import { Link, useLocation } from "react-router-dom";
import './Header.css';
import Logo from "../Logo";
import { useTranslation } from "react-i18next";
import ActionButton from "../ActionButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import NavMenu from "../NavMenu";
import * as Utils from "../../utils";

interface IHeader {
  toggleMobileMenu: () => void;
  openAddEmailPrompt: () => void;
  isMobileMenuOpen: boolean;
}

function Header(props: IHeader) {
  const { t, i18n } = useTranslation(['common', 'otherLanguage']);
    const location = useLocation();
    const languageLinkLocation = Utils.getCorrespondingPageRouteInOtherLanguage(t, i18n, location.pathname);

    return (
      <div id="header">
        <div className="topRow">

          <Logo />

          <div className="actionSection">
            <Link className="actionLink languageLink" to={languageLinkLocation}>
              {t('name', { ns: 'otherLanguage' })}
            </Link>
            <ActionButton onClick={props.openAddEmailPrompt} label={t('joinUs')} />
            <a href="/" className="actionButton secondary" target="_blank" rel="noreferrer">
              {t('donate')}
            </a>
            <button className="mobileMenuTrigger" aria-label={t('menu')} onClick={props.toggleMobileMenu}>
              <FontAwesomeIcon className="mobileMenuTriggerIcon" icon={props.isMobileMenuOpen ? faXmark : faBars} />
            </button>
          </div>
        </div>
        <div className="bottomRow">
          <div className="bottomRowContent">
            <NavMenu openAddEmailPrompt={props.openAddEmailPrompt} />
          </div>
        </div>
      </div>
    );
}

export default Header;