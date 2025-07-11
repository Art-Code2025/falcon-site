import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

type HeroProps = {
  heroImages: string[];
  heroIndex: number;
  scrollToSection: (sectionId: string) => void;
};

const Hero: React.FC<HeroProps> = ({ heroImages, heroIndex, scrollToSection }) => {
  const { t } = useTranslation();

  // Preload images for better performance
  useEffect(() => {
    heroImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [heroImages]);

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gray-900 text-white overflow-hidden">
      {/* Auto Image Slider */}
      <div className="absolute inset-0 w-full h-full">
        {heroImages.map((img, idx) => (
          <div 
            key={img} 
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${heroIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} 
            style={{ 
              transitionProperty: 'opacity',
              willChange: 'opacity'
            }}
          >
            <img
              src={img}
              alt={"Business Hero Slide " + (idx + 1)}
              className="w-full h-full object-cover"
              loading="eager"
              onError={e => { (e.target as HTMLImageElement).src = '/fallback.jpg'; }}
            />
            {/* Overlay Gradient ناعم فقط */}
            {heroIndex === idx && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-70" />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Hero Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center">
        <p className="text-blue-200 text-xs md:text-sm font-medium mb-4 tracking-widest uppercase animate-fadeInUp delay-100">
          {t('hero.subtitle')}
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] animate-fadeInUp delay-200">
          {t('hero.title')}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed animate-fadeInUp delay-300">
          {t('hero.description')}
        </p>
        <button
          onClick={() => scrollToSection('contact')}
          className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 animate-fadeInUp delay-400 hover:scale-105"
          aria-label="Contact us section"
        >
          {t('hero.ctaButton')}
        </button>
      </div>
      {/* Bottom Navigation Indicators - Hidden on mobile */}
      <div className="absolute bottom-8 left-0 right-0 hidden md:block z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-sm text-gray-200">
              <div className="w-px h-8 bg-gray-400"></div>
              <span>Investment Criteria</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-200">
              <span>Partnering With Falcons</span>
              <div className="w-px h-8 bg-gray-400"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 