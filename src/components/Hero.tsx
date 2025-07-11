import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type HeroProps = {
  heroImages: string[];
  heroIndex: number;
  scrollToSection: (sectionId: string) => void;
};

const Hero: React.FC<HeroProps> = ({ heroImages, heroIndex, scrollToSection }) => {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Preload images for better performance
  useEffect(() => {
    heroImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
    // Simulate loading delay for better UX
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [heroImages]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX - innerWidth / 2) / innerWidth,
        y: (clientY - innerHeight / 2) / innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gray-900 text-white overflow-hidden">
      {/* Auto Image Slider with Enhanced Effects */}
      <div className="absolute inset-0 w-full h-full">
        {heroImages.map((img, idx) => (
          <div 
            key={img} 
            className={`absolute inset-0 w-full h-full transition-all duration-1500 ease-in-out ${
              heroIndex === idx ? 'opacity-100 z-10 scale-105' : 'opacity-0 z-0 scale-100'
            }`} 
            style={{ 
              transitionProperty: 'opacity, transform',
              willChange: 'opacity, transform',
              transform: heroIndex === idx 
                ? `scale(1.05) translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)` 
                : 'scale(1)'
            }}
          >
            <img
              src={img}
              alt={"Business Hero Slide " + (idx + 1)}
              className="w-full h-full object-cover"
              loading="eager"
              onError={e => { (e.target as HTMLImageElement).src = '/fallback.jpg'; }}
            />
            {/* Enhanced Overlay Gradient with Silver Effect */}
            {heroIndex === idx && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Strong silver overlay for darkening effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-800/70 to-gray-700/40 opacity-90" />
                {/* Silver metallic effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-500/30 via-slate-400/20 to-slate-600/30" />
                {/* Additional silver tint for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-300/20 via-transparent to-slate-600/20" />
                {/* Subtle metallic shimmer */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-slate-200/10 to-transparent opacity-50" />
                {/* Animated particles effect */}
                <div className="absolute inset-0 opacity-40">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Enhanced Hero Content with Advanced Animations */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center">
        {/* Subtitle with typing effect */}
        <div className={`overflow-hidden mb-4 ${isLoaded ? 'animate-slideInFromTop' : 'opacity-0'}`}>
          <p className="text-white text-xs md:text-sm font-medium tracking-widest uppercase animate-fadeInUp delay-100 text-glow drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center typewriter">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* Main Title with enhanced effects */}
        <div className={`overflow-hidden mb-6 ${isLoaded ? 'animate-slideInFromTop delay-200' : 'opacity-0'}`}>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] animate-fadeInUp delay-300 text-center">
            <span className="block animate-gradient-text bg-gradient-to-r from-white via-white to-white bg-clip-text text-transparent text-glow-strong drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] text-reveal">
              {t('hero.title')}
            </span>
          </h1>
        </div>

        {/* Description with staggered animation */}
        <div className={`overflow-hidden mb-8 ${isLoaded ? 'animate-slideInFromTop delay-400' : 'opacity-0'}`}>
          <p className="text-white text-lg md:text-xl max-w-2xl leading-relaxed animate-fadeInUp delay-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center scroll-slide-right">
            {t('hero.description')}
          </p>
        </div>

        {/* Enhanced CTA Button */}
        <div className={`overflow-hidden ${isLoaded ? 'animate-slideInFromTop delay-600' : 'opacity-0'}`}>
          <button
            onClick={() => scrollToSection('contact')}
            className="group relative bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 text-white px-12 py-5 rounded-full text-lg font-semibold shadow-2xl transition-all duration-500 animate-fadeInUp delay-700 hover:scale-110 hover:shadow-blue-500/25 btn-shine magnetic-hover hover-3d"
            aria-label="Contact us section"
          >
            <span className="relative z-10">{t('hero.ctaButton')}</span>
            {/* Button shine effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 -translate-x-full group-hover:translate-x-full" />
            {/* Button glow */}
            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
          </button>
        </div>

        {/* Floating elements for visual interest */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-enhanced-float morph-shape" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-enhanced-float delay-1000 morph-shape" />
        <div className="absolute top-1/2 left-5 w-16 h-16 bg-green-500/10 rounded-full blur-xl animate-enhanced-float delay-2000 morph-shape" />
      </div>

      {/* Enhanced Bottom Navigation Indicators */}
      <div className="absolute bottom-8 left-0 right-0 hidden md:block z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-sm text-white animate-fadeInUp delay-800">
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-white to-transparent"></div>
              <span className="font-medium text-glow drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] scroll-slide-left">{t('hero.trading')}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-white animate-fadeInUp delay-900">
              <span className="font-medium text-glow drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] scroll-slide-right">{t('hero.experience')}</span>
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-white to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 scroll-indicator">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero; 