import React, { useState, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-transparent backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center group">
                {/* Enhanced Logo */}
                <div className="relative">
                  <img 
                    src="/logo.png" 
                    alt="Falcons Logo" 
                    className="w-12 h-12 md:w-16 md:h-16 mr-3 md:mr-4 transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div>
                  <h1 className={`text-xl md:text-3xl font-bold tracking-wider transition-colors duration-300 ${
                    scrolled ? 'text-gray-900' : 'text-white'
                  } group-hover:text-blue-600`}>
                    FALCONS
                  </h1>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-6 md:ml-10 flex items-baseline space-x-4 md:space-x-8">
              {[
                { key: 'home', label: t('navigation.about') },
                { key: 'services', label: t('navigation.portfolio') },
                { key: 'about', label: t('navigation.investments') },
                { key: 'team', label: t('navigation.partnering') },
                { key: 'contact', label: t('navigation.news') },
                { key: 'contact', label: t('navigation.contact') }
              ].map((item, index) => (
                <button 
                  key={item.key}
                  onClick={() => scrollToSection(item.key)} 
                  className={`transition-all duration-300 text-xs md:text-sm font-medium relative group ${
                    scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3 md:space-x-4">
            <LanguageSwitcher />
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:shadow-lg">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`transition-all duration-300 hover:scale-110 ${
                scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-300 hover:text-white'
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Enhanced Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-slideInFromTop">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-xl">
            {[
              { key: 'home', label: t('navigation.about') },
              { key: 'services', label: t('navigation.portfolio') },
              { key: 'about', label: t('navigation.investments') },
              { key: 'team', label: t('navigation.partnering') },
              { key: 'contact', label: t('navigation.contact') }
            ].map((item, index) => (
              <button 
                key={item.key}
                onClick={() => scrollToSection(item.key)} 
                className="block w-full text-left px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 text-sm font-medium rounded-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-gray-200 mt-2 pt-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation; 