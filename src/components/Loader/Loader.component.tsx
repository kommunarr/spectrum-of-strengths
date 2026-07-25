import { useTranslation } from 'react-i18next';
import './Loader.css';

function Loader() {
    const { t } = useTranslation(['common']);
    return <div className="loader" role="status" aria-live="polite" aria-label={t('loading')} />
}

export default Loader;