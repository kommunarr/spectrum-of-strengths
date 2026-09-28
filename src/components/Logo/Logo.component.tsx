import { Link } from "react-router-dom";
import './Logo.css';
import logoImage from '../../assets/SpectrumOfStrengthsLogo.svg';
import { useTranslation } from "react-i18next";
import { publishedRoute } from '../../utils/publishedRoute';

function Logo() {
    const { t } = useTranslation(['common']);
    return (
        <>
            <Link className="logoLink" to={publishedRoute(t('homePath'))}>
            <img src={logoImage} className="logo" alt={t('organizationName')} />
            </Link>
        </>
    );
}

export default Logo;
