import { useTranslation } from 'react-i18next';
import Logo from '../Logo';
import SocialMediaIconList from '../SocialMediaIconList';
import './Footer.css';
import ActionButton from '../ActionButton';
import { Link } from 'react-router-dom';

// logo and social media icons on the left, Subscribe button on the right

function Footer() {
    function openAddEmailPrompt() {
        console.log('x');
    }

    const { t } = useTranslation(['common']);
    const footerLinks = ['termsOfUseAndPrivacy', 'accessibilityStandards']
    return (
        <footer className="footer">
            <div className="footerContent">
                <div className="leftFooter">
                    <Logo />
                    {footerLinks.map((footerLink, index) => (
                        <Link key={index} className="footerLink" to={t(`${footerLink}Path`)}>
                            {t(footerLink)}
                        </Link>
                    ))}
                </div>
                <div className="rightFooter">
                    <SocialMediaIconList />
                    <ActionButton onClick={openAddEmailPrompt} label={t('joinUs')} />
                </div>
            </div>
        </footer>
    );
}

export default Footer;