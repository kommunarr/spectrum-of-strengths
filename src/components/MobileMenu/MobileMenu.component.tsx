import { useTranslation } from 'react-i18next';
import './MobileMenu.css';


function MobileMenu() {
    const { t } = useTranslation(['common']);
    return (
        <menu className="MobileMenu ">
            {t('It is mobile menu time my dudes')}
        </menu>
    );
}

export default MobileMenu;