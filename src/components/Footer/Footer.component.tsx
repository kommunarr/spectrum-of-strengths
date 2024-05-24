import Logo from '../Logo';
import SocialMediaIconList from '../SocialMediaIconList';
import './Footer.css';

// logo and social media icons on the left, Subscribe button on the right

function Footer() {
    return (
        <footer className="footer">
            <Logo />
            <SocialMediaIconList />
        </footer>
    );
}

export default Footer;