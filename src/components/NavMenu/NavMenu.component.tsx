import { useTranslation } from 'react-i18next';
import './NavMenu.css';
import * as Utils from "../../utils";
import { Link, NavLink, useLocation } from 'react-router-dom';

interface INavMenu {
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
                        const isInDevelopment = section === 'events' || section === 'contact';
                        const statusDescriptionId = `${props.id ?? 'primary-navigation'}-${section}-status`;
                        return (
                        <li key={section}>
                            <NavLink
                                className={({ isActive }) => `actionLink${isActive ? ' active' : ''}`}
                                to={Utils.publishedRoute(path)}
                                end={section !== 'archive'}
                                aria-describedby={isInDevelopment ? statusDescriptionId : undefined}
                            >
                                {t(section)}
                            </NavLink>
                            {isInDevelopment && (
                                <span className="navigationStatus" id={statusDescriptionId}>
                                    {t('inDevelopment')}
                                </span>
                            )}
                        </li>
                    )})}
                </ul>
                <ul className="mobileMenuOnly navigationMenuHeadings">
                    <li>
                        <Link className="actionLink" to={Utils.publishedRoute(languageLinkLocation)} lang={otherLanguageKey}>
                            {t('name', { ns: 'otherLanguage' })}
                        </Link>
                    </li>
        </ul>
      </nav>
    );
}

export default NavMenu;
