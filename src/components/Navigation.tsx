import React from 'react';
import { Menu, X } from 'lucide-react';

type NavigationProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  scrollToSection: (sectionId: string) => void;
};

const Navigation: React.FC<NavigationProps> = ({ isMenuOpen, setIsMenuOpen, scrollToSection }) => (
  <nav className="fixed top-0 w-full bg-transparent backdrop-blur-md z-50 transition-all duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16 md:h-20">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="flex items-center">
              {/* 3D Geometric Logo */}
              <div className="relative w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-3">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 transform rotate-45 rounded-sm shadow-lg"></div>
                <div className="absolute top-0.5 left-0.5 md:top-1 md:left-1 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-gray-300 to-gray-500 transform rotate-45 rounded-sm shadow-inner"></div>
              </div>
              <div>
                <h1 className="text-lg md:text-2xl font-bold text-white tracking-wider">FALCONS</h1>
                <p className="text-xs text-gray-400 tracking-widest">CAPITAL</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hidden md:block">
          <div className="ml-6 md:ml-10 flex items-baseline space-x-4 md:space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-white transition-all duration-300 text-xs md:text-sm font-medium">About</button>
            <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-white transition-all duration-300 text-xs md:text-sm font-medium">Portfolio</button>
            <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-white transition-all duration-300 text-xs md:text-sm font-medium">Investments</button>
            <button onClick={() => scrollToSection('team')} className="text-gray-300 hover:text-white transition-all duration-300 text-xs md:text-sm font-medium">Partnering</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-all duration-300 text-xs md:text-sm font-medium">News</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-all duration-300 text-xs md:text-sm font-medium">Contact</button>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-3 md:space-x-4">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full"></div>
          </div>
          <button className="bg-white/10 backdrop-blur-md text-white px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium border border-white/20 hover:bg-white/20 transition-all duration-300">
            Limited Partners Login
          </button>
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
          <button onClick={() => scrollToSection('home')} className="block w-full text-left px-3 py-3 text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">About</button>
          <button onClick={() => scrollToSection('services')} className="block w-full text-left px-3 py-3 text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">Portfolio</button>
          <button onClick={() => scrollToSection('about')} className="block w-full text-left px-3 py-3 text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">Investments</button>
          <button onClick={() => scrollToSection('team')} className="block w-full text-left px-3 py-3 text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">Partnering</button>
          <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-3 py-3 text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">Contact</button>
          <div className="border-t border-gray-700 mt-2 pt-2">
            <button className="block w-full text-left px-3 py-3 text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm font-medium">
              Limited Partners Login
            </button>
          </div>
        </div>
      </div>
    )}
  </nav>
);

export default Navigation; 