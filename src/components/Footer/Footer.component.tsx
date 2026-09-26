import { useTranslation } from 'react-i18next';
import Logo from '../Logo';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {

    const { t } = useTranslation(['common']);
    const footerLinks = ['termsOfUseAndPrivacy', 'accessibilityStandards']
    return (
        <footer className="footer">
            <div className="footerDesktopLogo"><Logo /></div>
            <div className="footerInfo">
                <div className="footerLinks">
                    {footerLinks.map((footerLink, index) => (
                        <Link key={index} className="footerLink" to={t(`${footerLink}Path`)}>
                            {t(footerLink)}
                        </Link>
                    ))}
                </div>
                <div className="footerMobileLogo"><Logo /></div>
            </div>
        </footer>
    );
}

export default Footer;
