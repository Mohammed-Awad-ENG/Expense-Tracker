import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 outline-none focus:outline-none"
            aria-label="Toggle language"
        >
            <span className="text-lg">🌐</span>
            {i18n.language === 'en' ? 'العربية' : 'English'}
        </button>
    );
};

export default LanguageSwitcher;
