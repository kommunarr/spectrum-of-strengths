import { useTranslation } from 'react-i18next';
import Logo from '../Logo';
import SocialMediaIconList from '../SocialMediaIconList';
import './Footer.css';
import ActionButton from '../ActionButton';
import { Link } from 'react-router-dom';

interface IFooter {
    openAddEmailPrompt: () => void;
  }

function Footer(props: IFooter) {

    const { t } = useTranslation(['common']);
    const footerLinks = ['termsOfUseAndPrivacy', 'accessibilityStandards']
    return (
        <footer className="footer">
            <Logo />
            <div className="footerInfo">
                <div className="footerLinks">
                    {footerLinks.map((footerLink, index) => (
                        <Link key={index} className="footerLink" to={t(`${footerLink}Path`)}>
                            {t(footerLink)}
                        </Link>
                    ))}
                </div>
                <div className="footerActionSectionAndMobileLogo">
                    <Logo />
                    <div className="footerActionSection">
                        <SocialMediaIconList />
                        <ActionButton onClick={props.openAddEmailPrompt} label={t('joinUs')} />
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;