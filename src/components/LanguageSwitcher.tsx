import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-all duration-300 text-xs md:text-sm font-medium"
      aria-label={`Switch to ${i18n.language === 'en' ? 'Arabic' : 'English'}`}
    >
      <Globe size={16} />
      <span>{i18n.language === 'en' ? 'العربية' : 'English'}</span>
    </button>
  );
};

export default LanguageSwitcher; 