import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, ArrowRight, ChevronLeft, ChevronRight, Star, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import { Helmet } from 'react-helmet';

const heroImages = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=70&fit=crop', // modern building
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=70&fit=crop', // handshake
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=70&fit=crop', // modern office
  'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=70&fit=crop', // corporate meeting
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=70&fit=crop'  // business strategy
];

function App() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [scrollY, setScrollY] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState<Record<string, boolean>>({});
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // refs for sections
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const humanRef = useRef<HTMLDivElement>(null);
  const sectorsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Set document direction based on language
  useEffect(() => {
    const currentLang = i18n.language;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [i18n.language]);

  // Enhanced scroll tracking with progress
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      
      setScrollY(scrolled);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse tracking for interactive effects
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

  // Enhanced Intersection Observer with scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          const elementId = element.id;
          
          if (entry.isIntersecting && elementId && !hasAnimated[elementId]) {
            setIsVisible(prev => ({ ...prev, [elementId]: true }));
            setHasAnimated(prev => ({ ...prev, [elementId]: true }));
            
            // Add scroll-triggered animations
            element.style.setProperty('--scroll-progress', '1');
            element.classList.add('scroll-animated');
          }
        });
      },
      { 
        threshold: [0.1, 0.3, 0.5, 0.7, 0.9],
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Observe all sections with id
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Additional observer for inner elements with fade-in-up-obs class
  useEffect(() => {
    const innerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          
          if (entry.isIntersecting && !element.classList.contains('visible')) {
            // Add a small delay to ensure smooth animation
            setTimeout(() => {
              element.classList.add('visible');
            }, 50);
          }
        });
      },
      { 
        threshold: [0.1, 0.3, 0.5, 0.7, 0.9],
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all elements with fade-in-up-obs class
    const innerElements = document.querySelectorAll('.fade-in-up-obs');
    innerElements.forEach(element => innerObserver.observe(element));

    return () => innerObserver.disconnect();
  }, []);

  // Hero image slider
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  }, []);

  return (
    <div className={`min-h-screen bg-gray-900 ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Helmet>
        <title>FALCONS - Hong Kong Trading Company | Furniture, Building Materials & Cosmetics</title>
        <meta name="description" content="FALCONS is a registered trading company in Hong Kong since 2004. We specialize in trading Furniture, Building materials and Cosmetics with direct supply from Chinese suppliers." />
        <meta name="keywords" content="Hong Kong trading, furniture, building materials, cosmetics, Chinese suppliers, international trade" />
        <meta name="author" content="FALCONS" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="FALCONS - Hong Kong Trading Company" />
        <meta property="og:description" content="Specialized trading in Furniture, Building materials and Cosmetics with 15+ years experience." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://falcons-trading.com" />
        <meta property="og:image" content="/logo.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FALCONS - Hong Kong Trading Company" />
        <meta name="twitter:description" content="Specialized trading in Furniture, Building materials and Cosmetics." />
        
        {/* Additional SEO */}
        <link rel="canonical" href="https://falcons-trading.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1e40af" />
      </Helmet>
      
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Interactive Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${50 + mousePosition.x * 20}%`,
            top: `${30 + mousePosition.y * 20}%`,
            transform: `translate(-50%, -50%) scale(${1 + Math.abs(mousePosition.x + mousePosition.y) * 0.5})`
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"
          style={{
            left: `${70 + mousePosition.y * 15}%`,
            top: `${60 + mousePosition.x * 15}%`,
            transform: `translate(-50%, -50%) scale(${1 + Math.abs(mousePosition.x - mousePosition.y) * 0.3})`
          }}
        />
      </div>

      {/* Navigation - Transparent with Blur */}
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} scrollToSection={scrollToSection} />
      <Hero heroImages={heroImages} heroIndex={heroIndex} scrollToSection={scrollToSection} />

      {/* About/Transformative Investments Section */}
      <section
        id="about"
        ref={aboutRef}
        className={`py-12 md:py-20 bg-white relative overflow-x-hidden fade-in-up-obs${isVisible['about'] ? ' visible' : ''}`}
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-30 animate-enhanced-float morph-shape" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-30 animate-enhanced-float delay-1000 morph-shape" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Enhanced Steps at the top */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-12 mb-10 md:mb-16">
            <div className={`text-center fade-in-up-obs stagger-1 glitch-effect ${isVisible['about'] ? 'visible scroll-bounce' : ''} hover:scale-105 transition-transform duration-300 hover-3d`}>
              <div className="text-xs md:text-sm text-gray-400 italic mb-1 typewriter">{t('about.steps.established')}</div>
              <div className="text-base md:text-lg font-semibold tracking-wide text-gray-700 text-glow text-reveal">2004</div>
            </div>
            <div className={`text-center fade-in-up-obs stagger-2 ${isVisible['about'] ? 'visible scroll-rotate' : ''} hover:scale-105 transition-transform duration-300 hover-3d`}>
              <div className="text-xs md:text-sm text-gray-400 italic mb-1 typewriter">{t('about.steps.experience')}</div>
              <div className="text-base md:text-lg font-semibold tracking-wide text-gray-700 text-glow text-reveal">15+ Years</div>
            </div>
            <div className={`text-center fade-in-up-obs stagger-3 ${isVisible['about'] ? 'visible scroll-scale' : ''} hover:scale-105 transition-transform duration-300 hover-3d`}>
              <div className="text-xs md:text-sm text-gray-400 italic mb-1 typewriter">{t('about.steps.location')}</div>
              <div className="text-base md:text-lg font-semibold tracking-wide text-gray-700 text-glow text-reveal">Hong Kong</div>
            </div>
            <div className={`text-center fade-in-up-obs stagger-4 ${isVisible['about'] ? 'visible scroll-slide-left' : ''} hover:scale-105 transition-transform duration-300 hover-3d`}>
              <div className="text-xs md:text-sm text-gray-400 italic mb-1 typewriter">{t('about.steps.services')}</div>
              <div className="text-base md:text-lg font-semibold tracking-wide text-gray-700 text-glow text-reveal">Trading</div>
            </div>
          </div>
          
          {/* Main content with enhanced animations */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
            {/* Left: Text with enhanced effects */}
            <div className="relative">
              {/* Decorative line */}
              <div className="absolute top-0 left-0 w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-8 morph-shape" />
              
              <h2 className={`text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 fade-in-up-obs stagger-5 text-reveal ${isVisible['about'] ? 'visible text-reveal' : ''}`}> 
                <span className="italic font-normal text-blue-600 typewriter">{t('about.title')}</span>
              </h2>
              <p className={`text-gray-700 text-base md:text-lg mb-6 fade-in-up-obs stagger-6 scroll-slide-right text-reveal ${isVisible['about'] ? 'visible' : ''} leading-relaxed`}>
                {t('about.subtitle')}
              </p>
              <p className={`text-gray-500 text-sm md:text-base mb-8 fade-in-up-obs stagger-7 scroll-animated text-reveal ${isVisible['about'] ? 'visible' : ''} leading-relaxed`}>
                {t('about.description')}
              </p>
              <button className={`inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg transition-all duration-300 fade-in-up-obs stagger-8 scroll-bounce hover:scale-105 hover:shadow-blue-500/25 btn-shine magnetic-hover ${isVisible['about'] ? 'visible' : ''}`} onClick={() => scrollToSection('contact')}>
                {t('about.ctaButton')}
                <ArrowRight size={18} className="animate-pulse" />
              </button>
            </div>
            
            {/* Right: Enhanced Image with effects */}
            <div className={`flex justify-center md:justify-end fade-in-up-obs stagger-9 scroll-rotate relative`}> 
              <div className="relative group hover-3d w-full max-w-xs sm:max-w-sm md:max-w-md">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80" 
                  alt="About Us" 
                  className="rounded-3xl shadow-2xl w-full h-auto object-contain border border-gray-100 transition-all duration-500 group-hover:scale-105 group-hover:shadow-3d parallax-scroll morph-shape" 
                  style={{ 
                    minHeight: '250px',
                    maxHeight: '400px',
                    background: '#f3f4f6'
                  }} 
                />
                {/* Overlay effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-enhanced-float morph-shape" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full animate-enhanced-float delay-1000 morph-shape" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        ref={servicesRef}
        className={`py-12 md:py-20 bg-white fade-in-up-obs${isVisible['services'] ? ' visible' : ''} relative overflow-hidden`}
      >
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-green-100 rounded-full blur-3xl opacity-30 animate-enhanced-float morph-shape" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-30 animate-enhanced-float delay-1500 morph-shape" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 md:mb-16">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 transition-all duration-1000 fade-in-up-obs stagger-1 ${isVisible['services'] ? 'visible text-reveal' : ''} text-glow-strong`}>
              {t('services.title')}
            </h2>
            <p className={`text-lg md:text-xl text-gray-600 animate-fadeInUp delay-200 ${isVisible['services'] ? 'scroll-slide-right' : ''}`}>
              {t('services.subtitle')}
            </p>
          </div>

          {/* Enhanced Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-2 fade-in-up-obs stagger-2${isVisible['services'] ? ' visible scroll-bounce' : ''} group hover:scale-105 hover-3d`}>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 morph-shape">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded transform rotate-45"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 text-glow">{t('services.consulting.title')}</h3>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
                {t('services.consulting.description')}
              </p>
            </div>
            
            <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-2 delay-200 fade-in-up-obs stagger-3${isVisible['services'] ? ' visible scroll-rotate' : ''} group hover:scale-105 hover-3d`}>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 morph-shape">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 text-glow">{t('services.support.title')}</h3>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
                {t('services.support.description')}
              </p>
            </div>
            
            <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-2 delay-400 sm:col-span-2 lg:col-span-1 fade-in-up-obs stagger-4${isVisible['services'] ? ' visible scroll-scale' : ''} group hover:scale-105 hover-3d`}>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 morph-shape">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-sm transform rotate-12"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 text-glow">{t('services.services.title')}</h3>
              <div className="text-gray-600 mb-4 md:mb-6 text-left text-xs md:text-sm">
                {(t('services.services.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <p key={index} className="mb-2 flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 flex-shrink-0 morph-shape"></span>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Large Image Section */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group hover-3d">
            <div 
              className="h-64 sm:h-80 md:h-96 bg-cover bg-center relative transition-transform duration-700 group-hover:scale-105 parallax-scroll"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1920&q=80')`,
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent group-hover:from-gray-900/70 transition-all duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h3 className={`text-lg sm:text-2xl md:text-3xl font-bold mb-4 text-glow-strong ${isVisible['services'] ? 'text-reveal' : ''}`}>
                    {t('services.hero.title')}
                  </h3>
                  <p className="text-sm sm:text-lg mb-4">
                    {t('services.hero.subtitle')}
                  </p>
                  <button className={`bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 sm:px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 text-xs sm:text-sm md:text-base hover:scale-105 hover:shadow-blue-500/25 btn-shine magnetic-hover ${isVisible['services'] ? 'scroll-bounce' : ''}`} onClick={() => scrollToSection('contact')}>
                    {t('services.hero.button')}
                  </button>
                </div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute top-4 right-4 w-6 h-6 bg-white/20 rounded-full animate-enhanced-float morph-shape" />
            <div className="absolute bottom-4 left-4 w-4 h-4 bg-white/20 rounded-full animate-enhanced-float delay-1000 morph-shape" />
          </div>
        </div>
      </section>

      {/* Human Capital / Our Approach Section */}
      <section
        id="human"
        ref={humanRef}
        className={`relative py-12 md:py-20 bg-gradient-to-b from-white to-gray-100 overflow-x-hidden fade-in-up-obs${isVisible['human'] ? ' visible' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Glassmorphism Card */}
            <div className="relative z-10 animate-fadeInLeft">
              <div className="backdrop-blur-strong bg-white/60 border border-gray-200 rounded-3xl shadow-2xl p-8 md:p-12">
                <div className="mb-6">
                  <span className="block text-xs md:text-sm text-blue-700 font-semibold tracking-widest mb-2">{t('humanCapital.label')}</span>
                  <h3 className="text-2xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                    {t('humanCapital.title')}
                  </h3>
                  <p className="text-gray-700 text-base md:text-lg mb-4">
                    {t('humanCapital.description')}
                  </p>
                  <p className="text-gray-500 text-sm md:text-base mb-6">
                    {t('humanCapital.subDescription')}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow transition-all duration-300" onClick={() => scrollToSection('services')}>
                      {t('humanCapital.buttons.services')}
                      <ArrowRight size={18} />
                    </button>
                    <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 hover:bg-white text-blue-700 font-semibold border border-blue-700 shadow transition-all duration-300" onClick={() => scrollToSection('portfolio')}>
                      {t('humanCapital.buttons.readMore')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Targeted Sectors Section */}
      <section
        id="sectors"
        ref={sectorsRef}
        className={`relative py-12 md:py-20 bg-gray-900 text-white overflow-x-hidden fade-in-up-obs${isVisible['sectors'] ? ' visible' : ''}`}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{backgroundImage: `url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80')`}}></div>
        <div className="absolute inset-0 bg-gray-900/80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-10 md:mb-16">
            <h3 className="text-sm font-semibold mb-2 tracking-wider uppercase text-gray-300">{t('sectors.label')}</h3>
            <p className="text-gray-200 max-w-2xl text-sm md:text-base">
              {t('sectors.description')}
            </p>
          </div>
          {/* Sectors grid */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            {/* Furniture */}
            <div className="relative group rounded-2xl overflow-hidden shadow-xl animate-fadeInUp">
              <div className="aspect-square w-full">
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80&fit=crop" 
                  alt="Furniture" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h4 className="text-sm md:text-lg font-light text-gray-300 mb-1">{t('sectors.furniture.category')}</h4>
                <h3 className="text-lg md:text-2xl font-bold">{t('sectors.furniture.title')}</h3>
              </div>
            </div>
            {/* Building Materials */}
            <div className="relative group rounded-2xl overflow-hidden shadow-xl animate-fadeInUp delay-200">
              <div className="aspect-square w-full">
                <img 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&fit=crop" 
                  alt="Building Materials" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h4 className="text-sm md:text-lg font-light text-gray-300 mb-1">{t('sectors.buildingMaterials.category')}</h4>
                <h3 className="text-lg md:text-2xl font-bold">{t('sectors.buildingMaterials.title')}</h3>
              </div>
            </div>
            {/* Cosmetics */}
            <div className="relative group rounded-2xl overflow-hidden shadow-xl animate-fadeInUp delay-400">
              <div className="aspect-square w-full">
                <img 
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80&fit=crop" 
                  alt="Cosmetics" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h4 className="text-sm md:text-lg font-light text-gray-300 mb-1">{t('sectors.cosmetics.category')}</h4>
                <h3 className="text-lg md:text-2xl font-bold">{t('sectors.cosmetics.title')}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <Portfolio />

      {/* Reviews Section */}
      <Testimonials />

      {/* Team Section */}
      <section
        id="team"
        ref={teamRef}
        className={`py-12 md:py-20 bg-gray-100 fade-in-up-obs${isVisible['team'] ? ' visible' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 transition-all duration-1000 fade-in-up-obs stagger-1 ${isVisible['team'] ? 'visible' : ''}`}>
              {t('team.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('team.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Zailai Shouki */}
            <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-2 fade-in-up-obs stagger-2${isVisible['team'] ? ' visible' : ''}`}>
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 md:w-6 md:h-6 bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{t('team.members.zailai.name')}</h3>
              <p className="text-blue-600 font-semibold mb-3 md:mb-4 text-sm md:text-base">{t('team.members.zailai.position')}</p>
              <p className="text-gray-600 text-sm md:text-base">
                {t('team.members.zailai.description')}
              </p>
            </div>
            
            {/* Minna Gou */}
            <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-2 delay-200 fade-in-up-obs stagger-3${isVisible['team'] ? ' visible' : ''}`}>
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 md:w-6 md:h-6 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{t('team.members.minna.name')}</h3>
              <p className="text-blue-600 font-semibold mb-3 md:mb-4 text-sm md:text-base">{t('team.members.minna.position')}</p>
              <p className="text-gray-600 text-sm md:text-base">
                {t('team.members.minna.description')}
              </p>
            </div>

            {/* Saeed Saad Alghamdi */}
            <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-2 delay-400 fade-in-up-obs stagger-4${isVisible['team'] ? ' visible' : ''} md:col-span-2 lg:col-span-1`}>
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 md:w-6 md:h-6 bg-purple-500 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{t('team.members.saeed.name')}</h3>
              <p className="text-blue-600 font-semibold mb-3 md:mb-4 text-sm md:text-base">{t('team.members.saeed.position')}</p>
              <p className="text-gray-600 text-sm md:text-base">
                {t('team.members.saeed.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Address & Map Section */}
      <section
        id="contact"
        ref={contactRef}
        className={`relative py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white fade-in-up-obs${isVisible['contact'] ? ' visible' : ''}`}
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-30 animate-enhanced-float morph-shape" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-30 animate-enhanced-float delay-1000 morph-shape" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className={`text-3xl md:text-5xl font-bold text-gray-900 mb-4 transition-all duration-1000 fade-in-up-obs stagger-1 ${isVisible['contact'] ? 'visible text-reveal' : ''} text-glow-strong`}>
              {t('contact.title')}
            </h2>
            <p className={`text-lg md:text-xl text-gray-600 animate-fadeInUp delay-200 ${isVisible['contact'] ? 'scroll-slide-right' : ''}`}>
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 md:gap-16">
            {/* Left: Contact Information */}
            <div className="space-y-8 animate-fadeInLeft">
              {/* Office Address */}
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('contact.address.title')}</h3>
                    <p className="text-gray-700 mb-2">{t('contact.address.office')}</p>
                    <p className="text-gray-600 text-sm">{t('contact.address.mobile')}</p>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Phone</h4>
                      <a href="tel:8662061093893" className="text-blue-600 hover:text-blue-700 transition-colors">
                        {t('contact.info.phone')}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('contact.info.emailLabel')}</h4>
                      <a href="mailto:falconsmgr@hotmail.com" className="text-blue-600 hover:text-blue-700 transition-colors">
                        {t('contact.info.email')}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('contact.info.businessHoursLabel')}</h4>
                      <p className="text-gray-600 text-sm">{t('contact.info.hours.weekdays')}</p>
                      <p className="text-gray-600 text-sm">{t('contact.info.hours.saturday')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white text-center">
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-sm opacity-90">{t('hero.experience')}</div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white text-center">
                  <div className="text-2xl font-bold">25+</div>
                  <div className="text-sm opacity-90">{t('reviews.stats.countriesServed')}</div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="animate-fadeInRight">
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <button
                    type="button"
                    onClick={() => setIsContactFormOpen((prev) => !prev)}
                    className="flex items-center justify-between w-full text-left hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  >
                    <h3 className="text-2xl font-bold text-gray-900">{t('contact.form.title')}</h3>
                    <span
                      className={`inline-block transition-transform duration-300 text-blue-600 text-xl font-bold ${isContactFormOpen ? 'rotate-180' : 'rotate-0'}`}
                    >
                      ▼
                    </span>
                  </button>
                </div>
                <div
                  style={{
                    maxHeight: isContactFormOpen ? 1000 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: isContactFormOpen ? 1 : 0,
                  }}
                >
                  <form className="space-y-6" style={{paddingTop: isContactFormOpen ? 0 : 0}} onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const email = formData.get('email') as string;
                    const name = formData.get('name') as string;
                    const company = formData.get('company') as string;
                    const phone = formData.get('phone') as string;
                    const message = formData.get('message') as string;
                    // Create email body
                    const emailBody = `\nName: ${name}\nCompany: ${company}\nPhone: ${phone}\n\nMessage:\n${message}\n`;
                    window.open(`mailto:falconsmgr@hotmail.com?subject=Contact from ${name} - ${company}&body=${encodeURIComponent(emailBody)}`);
                  }}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('contact.form.fullName')}</label>
                        <input 
                          type="text" 
                          name="name"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder={t('contact.form.fullNamePlaceholder')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('contact.form.companyName')}</label>
                        <input 
                          type="text" 
                          name="company"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder={t('contact.form.companyNamePlaceholder')}
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('contact.form.email')}</label>
                        <input 
                          type="email" 
                          name="email"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder={t('contact.form.emailPlaceholder')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('contact.form.phone')}</label>
                        <input 
                          type="tel" 
                          name="phone"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder={t('contact.form.phonePlaceholder')}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('contact.form.message')}</label>
                      <textarea 
                        name="message"
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                        placeholder={t('contact.form.messagePlaceholder')}
                      ></textarea>
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
                    >
                      {t('contact.form.sendButton')}
                    </button>
                    <div className="text-center text-sm text-gray-600 mt-4">
                      <p>{t('contact.form.directEmail')}</p>
                      <a 
                        href="mailto:falconsmgr@hotmail.com" 
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {t('contact.form.directEmailLink')}
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12 md:mt-16">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="p-6 md:p-8 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('contact.location.title')}</h3>
                <p className="text-gray-600">{t('contact.location.description')}</p>
              </div>
              <div className="h-80 md:h-96">
                <iframe
                  title="FALCONS Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.823084013672!2d113.2643853154321!3d23.1291639848897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3402ffb7e2b1b1b1%3A0x8e8e8e8e8e8e8e8e!2sYuexiu%20District%2C%20Guangzhou%2C%20Guangdong%20Province%2C%20China!5e0!3m2!1sen!2sus!4v1717171717171!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex gap-8 justify-center py-8">
                <a 
                  href="https://maps.google.com/?q=Hua+Le+Lu,+Yuexiu,+Guangzhou,+Guangdong,+China"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-20 h-20 rounded-full shadow-lg bg-white hover:scale-110 transition-transform duration-200"
                  style={{ boxShadow: '0 4px 16px 0 rgba(60,60,60,0.10)' }}
                >
                  <img src="/Google_Maps_icon_(2020).svg.png" alt="Google Maps" className="w-14 h-14 max-w-14 max-h-14 object-contain" />
                </a>
                <a 
                  href="https://waze.com/ul?q=Hua+Le+Lu,+Yuexiu,+Guangzhou,+Guangdong,+China&navigate=yes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-20 h-20 rounded-full shadow-lg bg-white hover:scale-110 transition-transform duration-200"
                  style={{ boxShadow: '0 4px 16px 0 rgba(60,60,60,0.10)' }}
                >
                  <img src="/waze.svg" alt="Waze" className="w-14 h-14 object-contain" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;