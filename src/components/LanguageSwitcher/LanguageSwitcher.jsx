import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.scss';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const currentLanguage = i18n.language || 'es';

    return (
        <div className="language-switcher">
            <button
                className={`language-switcher__btn ${currentLanguage === 'es' ? 'active' : ''}`}
                onClick={() => changeLanguage('es')}
                aria-label="Cambiar a español"
                aria-pressed={currentLanguage === 'es'}
            >
                ES
            </button>
            <span className="language-switcher__separator">|</span>
            <button
                className={`language-switcher__btn ${currentLanguage === 'ca' ? 'active' : ''}`}
                onClick={() => changeLanguage('ca')}
                aria-label="Canviar a català"
                aria-pressed={currentLanguage === 'ca'}
            >
                CA
            </button>
        </div>
    );
}
