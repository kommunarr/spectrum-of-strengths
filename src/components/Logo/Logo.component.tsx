import { Link, useLocation } from "react-router-dom";
import './Logo.css';
import { useTranslation } from "react-i18next";

function Logo() {
    const { t } = useTranslation(['common']);
    const location = useLocation();
    const isFrenchPath = location.pathname.startsWith('/fr/');
    const srcPath = `${isFrenchPath ? '../' : ''}src/assets/SpectrumOfStrengthsLogo.svg`
    return (
        <>
            <Link className="logoLink" to={t('homePath')}>
            <img src={srcPath} className="logo" alt="" />
            </Link>
        </>
    );
}

export default Logo;