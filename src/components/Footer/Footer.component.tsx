import { useTranslation } from 'react-i18next';
import Logo from '../Logo';
import SocialMediaIconList from '../SocialMediaIconList';
import './Footer.css';
import ActionButton from '../ActionButton';

// logo and social media icons on the left, Subscribe button on the right

function Footer() {
    function openAddEmailPrompt() {
        console.log('x');
    }

    const { t } = useTranslation(['common']);
    return (
        <footer className="footer">
            <div className="footerContent">
                <div className="leftFooter">
                    <Logo />
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