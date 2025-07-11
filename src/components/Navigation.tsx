import React from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

type NavigationProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  scrollToSection: (sectionId: string) => void;
};

const Navigation: React.FC<NavigationProps> = ({ isMenuOpen, setIsMenuOpen, scrollToSection }) => {
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 w-full bg-transparent backdrop-blur-md z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                {/* Custom Logo */}
                <img 
                  src="/logo.png" 
                  alt="Falcons Logo" 
                  className="w-12 h-12 md:w-16 md:h-16 mr-3 md:mr-4"
                />
                <div>
                  <h1 className="text-xl md:text-3xl font-bold text-white tracking-wider">FALCONS</h1>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-6 md:ml-10 flex items-baseline space-x-4 md:space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-white transition-all duration-300 text-xs md:text-sm font-medium">{t('navigation.about')}</button>
              <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-white transition-all duration-300 text-xs md:text-sm font-medium">{t('navigation.portfolio')}</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-white transition-all duration-300 text-xs md:text-sm font-medium">{t('navigation.investments')}</button>
              <button onClick={() => scrollToSection('team')} className="text-gray-300 hover:text-white transition-all duration-300 text-xs md:text-sm font-medium">{t('navigation.partnering')}</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-all duration-300 text-xs md:text-sm font-medium">{t('navigation.news')}</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-all duration-300 text-xs md:text-sm font-medium">{t('navigation.contact')}</button>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3 md:space-x-4">
            <LanguageSwitcher />
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full"></div>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
            <button onClick={() => scrollToSection('home')} className="block w-full text-left px-3 py-3 text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">{t('navigation.about')}</button>
            <button onClick={() => scrollToSection('services')} className="block w-full text-left px-3 py-3 text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">{t('navigation.portfolio')}</button>
            <button onClick={() => scrollToSection('about')} className="block w-full text-left px-3 py-3 text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">{t('navigation.investments')}</button>
            <button onClick={() => scrollToSection('team')} className="block w-full text-left px-3 py-3 text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">{t('navigation.partnering')}</button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-3 py-3 text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">{t('navigation.contact')}</button>
            <div className="border-t border-gray-700 mt-2 pt-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation; 