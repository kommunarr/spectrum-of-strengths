import { useTranslation } from 'react-i18next';
import './NavMenu.css';
import * as Utils from "../../utils";
import { Link, NavLink, useLocation } from 'react-router-dom';
import type { MouseEventHandler } from 'react';
import ActionButton from '../ActionButton';

interface INavMenu {
    openAddEmailPrompt: MouseEventHandler<HTMLButtonElement>;
    id?: string;
    hidden?: boolean;
}

function NavMenu(props: INavMenu) {
    const { t, i18n } = useTranslation(['common', 'otherLanguage']);
    const location = useLocation();
    const languageLinkLocation = Utils.getCorrespondingPageRouteInOtherLanguage(t, i18n, location.pathname);
    const otherLanguageKey = i18n.resolvedLanguage === 'en' ? 'fr' : 'en';

    return (
        <nav className="navigationMenu" id={props.id} aria-label={t('primaryNavigation')} hidden={props.hidden}>
                <ul className="coreMenu navigationMenuHeadings">
                    {Utils.navMenuSections.map((section) =>
                    {
                        const path = t(`${section}Path`);
                        return (
                        <li key={section}>
                            <NavLink className={({ isActive }) => `actionLink${isActive ? ' active' : ''}`} to={path} end>
                                {t(section)}
                            </NavLink>
                        </li>
                    )})}
                </ul>
                <ul className="mobileMenuOnly navigationMenuHeadings">
                    <li>
                        <ActionButton
                            label={t('joinUs')}
                            link
                            className="menuButton"
                            onClick={props.openAddEmailPrompt}
                        />
                    </li>
                    <li>
                        <Link className="actionLink" to={languageLinkLocation} lang={otherLanguageKey}>
                            {t('name', { ns: 'otherLanguage' })}
                        </Link>
                    </li>
        </ul>
      </nav>
    );
}

export default NavMenu;
