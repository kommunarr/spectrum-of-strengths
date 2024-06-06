import './SocialMediaIconList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'

function SocialMediaIconList() {
    return (
        <div className="socialMediaIconList">
            <a className="socialMediaIconLink" href="https://www.facebook.com/profile.php?id=61556445292415" target="_blank" rel="noreferrer">
                <FontAwesomeIcon className="socialMediaIcon" icon={faFacebook} title="Facebook" />
            </a>
        </div>
    );
}

export default SocialMediaIconList;