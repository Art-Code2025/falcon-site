import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="text-xs font-bold px-2 py-1 md:px-3 md:py-2 rounded-lg bg-blue-600/90 backdrop-blur-sm border border-blue-500/50 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-lg"
      title={i18n.language === 'en' ? 'العربية' : 'English'}
    >
      {i18n.language === 'en' ? 'عربي' : 'EN'}
    </button>
  );
};

export default LanguageSwitcher; 