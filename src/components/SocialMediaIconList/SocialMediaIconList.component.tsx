import './SocialMediaIconList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'

function SocialMediaIconList() {
    return (
        <div className="socialMediaIconList">
            <a href="https://www.facebook.com/profile.php?id=61556445292415">
                <FontAwesomeIcon icon={faFacebook} title="Facebook" />
            </a>
        </div>
    );
}

export default SocialMediaIconList;