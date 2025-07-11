import React from 'react';

type HeroProps = {
  heroImages: string[];
  heroIndex: number;
  scrollToSection: (sectionId: string) => void;
};

const Hero: React.FC<HeroProps> = ({ heroImages, heroIndex, scrollToSection }) => (
  <section id="home" className="relative min-h-screen flex items-center bg-gray-900 text-white overflow-hidden">
    {/* Auto Image Slider */}
    <div className="absolute inset-0 w-full h-full">
      {heroImages.map((img, idx) => (
        <img
          key={img}
          src={img}
          alt={"Business Hero Slide " + (idx + 1)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${heroIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          style={{ transitionProperty: 'opacity' }}
          loading="lazy"
          onError={e => { (e.target as HTMLImageElement).src = '/fallback.jpg'; }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/80 to-black/70 mix-blend-multiply" />
    </div>
    {/* Hero Content */}
    <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center">
      <p className="text-blue-200 text-xs md:text-sm font-medium mb-4 tracking-widest uppercase animate-fadeInUp">
        PEOPLE ARE THE MOST IMPORTANT INVESTMENT
      </p>
      <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-fadeInUp delay-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
        WE MAKE
      </h1>
      <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed animate-fadeInUp delay-500">
        We are Falcons Capital and we empower Industrial Growth
      </p>
      <button
        onClick={() => scrollToSection('contact')}
        className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 animate-fadeInUp delay-1000"
        aria-label="Contact us section"
      >
        Contact us
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

export default Hero; 