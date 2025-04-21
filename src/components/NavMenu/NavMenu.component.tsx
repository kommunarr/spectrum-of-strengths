import { useTranslation } from 'react-i18next';
import './NavMenu.css';
import * as Utils from "../../utils";
import { Link, useLocation } from 'react-router-dom';
import ActionButton from '../ActionButton';

interface INavMenu {
    openAddEmailPrompt: () => void;
}

function NavMenu(props: INavMenu) {
    const { t, i18n } = useTranslation(['common', 'otherLanguage']);
    const location = useLocation();
    const currentPathname = location.pathname.substring(1);
    const languageLinkLocation = Utils.getCorrespondingPageRouteInOtherLanguage(t, i18n, location.pathname);

    return (
        <nav className="navigationMenu">
                <ul className="navigationMenuHeadings">
                <div className="coreMenu">
                    {Utils.navMenuSections.map((section, index) => 
                    {
                        const path = t(`${section}Path`);
                        const activeClass = (currentPathname === encodeURI(path) ? ' active' : '');
                        return (
                        <li key={index}>
                            <Link className={`actionLink${activeClass}`} to={path}>{t(section)}</Link>
                        </li>
                    )})}
                </div>
                <div className="mobileMenuOnly">
                    <li>
                        <ActionButton label={t('joinUs')} link="true" className="menuButton" onClick={props.openAddEmailPrompt} />
                    </li>
                    <li>
                        <Link className="actionLink" to={languageLinkLocation}>
                            {t('name', { ns: 'otherLanguage' })}
                        </Link>
                    </li>
                </div>
        </ul>
      </nav>
    );
}

export default NavMenu;