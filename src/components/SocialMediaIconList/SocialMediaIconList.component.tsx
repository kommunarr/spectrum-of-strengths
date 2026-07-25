import './SocialMediaIconList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { useTranslation } from 'react-i18next';

function SocialMediaIconList() {
    const { t } = useTranslation(['common']);

    return (
        <div className="socialMediaIconList">
            <a
                className="socialMediaIconLink"
                href="https://www.facebook.com/profile.php?id=61556445292415"
                target="_blank"
                rel="noreferrer"
                aria-label={t('facebook')}
            >
                <FontAwesomeIcon aria-hidden="true" className="socialMediaIcon" icon={faFacebook} />
            </a>
        </div>
    );
}

export default SocialMediaIconList;
