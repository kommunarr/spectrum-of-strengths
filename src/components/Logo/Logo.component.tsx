import { Link } from "react-router-dom";
import './Logo.css';
import logoImage from '../../assets/SpectrumOfStrengthsLogo.svg';
import { useTranslation } from "react-i18next";

function Logo() {
    const { t } = useTranslation(['common']);
    return (
        <>
            <Link className="logoLink" to={t('homePath')}>
            <img src={logoImage} className="logo" alt="" />
            </Link>
        </>
    );
}

export default Logo;