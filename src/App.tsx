import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, ArrowRight, ChevronLeft, ChevronRight, Star, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Footer from './components/Footer';
import { Helmet } from 'react-helmet';

const heroImages = [
  '/1.png',
  '/2.png', 
  '/3.png',
  '/4.png',
  '/5.png'
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

  // refs for sections
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const humanRef = useRef<HTMLDivElement>(null);
  const sectorsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

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
        <title>Falcons Capital - Business Consulting & Investments</title>
        <meta name="description" content="Falcons Capital empowers industrial growth through strategic investments and business consulting services." />
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
              <button className={`inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg transition-all duration-300 fade-in-up-obs stagger-8 scroll-bounce hover:scale-105 hover:shadow-blue-500/25 btn-shine magnetic-hover ${isVisible['about'] ? 'visible' : ''}`}>
                {t('about.ctaButton')}
                <ArrowRight size={18} className="animate-pulse" />
              </button>
            </div>
            
            {/* Right: Enhanced Image with effects */}
            <div className={`flex justify-center md:justify-end fade-in-up-obs stagger-9 scroll-rotate relative`}> 
              <div className="relative group hover-3d">
                <img 
                  src="/1.png" 
                  alt="About Us" 
                  className="rounded-3xl shadow-2xl w-full max-w-md object-cover border border-gray-100 transition-all duration-500 group-hover:scale-105 group-hover:shadow-3d parallax-scroll morph-shape" 
                  style={{ minHeight: '260px', background: '#f3f4f6' }} 
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
              className="h-64 md:h-96 bg-cover bg-center relative transition-transform duration-700 group-hover:scale-105 parallax-scroll"
              style={{
                backgroundImage: `url('/2.png')`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent group-hover:from-gray-900/70 transition-all duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h3 className={`text-2xl md:text-3xl font-bold mb-4 text-glow-strong ${isVisible['services'] ? 'text-reveal' : ''}`}>
                    Financial advice that can save you time and money.
                  </h3>
                  <p className="text-lg mb-4">
                    Marketing experience that counts when trying to reach your customer base.
                  </p>
                  <button className={`bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base hover:scale-105 hover:shadow-blue-500/25 btn-shine magnetic-hover ${isVisible['services'] ? 'scroll-bounce' : ''}`}>
                    Contact Us
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
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
            {/* Left: Glassmorphism Card */}
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
                    <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow transition-all duration-300">
                      {t('humanCapital.buttons.services')}
                      <ArrowRight size={18} />
                    </button>
                    <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 hover:bg-white text-blue-700 font-semibold border border-blue-700 shadow transition-all duration-300">
                      {t('humanCapital.buttons.readMore')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Right: Image with overlay */}
            <div className="relative flex justify-center md:justify-end animate-fadeInRight delay-300">
              <img
                src="/2.png"
                alt="Business Meeting"
                className="rounded-3xl shadow-2xl w-full max-w-lg object-cover border border-gray-100"
                style={{ minHeight: '260px', background: '#f3f4f6' }}
              />
              {/* Glass overlay for effect */}
              <div className="absolute inset-0 rounded-3xl bg-white/30 backdrop-blur-strong pointer-events-none" style={{mixBlendMode:'lighten'}}></div>
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
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{backgroundImage: `url('/3.png')`}}></div>
        <div className="absolute inset-0 bg-gray-900/80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-10 md:mb-16">
            <h3 className="text-sm font-semibold mb-2 tracking-wider uppercase text-gray-300">{t('sectors.label')}</h3>
            <p className="text-gray-200 max-w-2xl text-sm md:text-base">
              {t('sectors.description')}
            </p>
          </div>
          {/* Sectors grid */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Furniture */}
            <div className="relative group rounded-2xl overflow-hidden shadow-xl animate-fadeInUp">
              <img src="/4.png" alt="Furniture" className="w-full h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-lg md:text-xl font-light text-gray-300 mb-1">{t('sectors.furniture.category')}</h4>
                <h3 className="text-2xl md:text-3xl font-bold">{t('sectors.furniture.title')}</h3>
              </div>
            </div>
            {/* Building Materials */}
            <div className="relative group rounded-2xl overflow-hidden shadow-xl animate-fadeInUp delay-200">
              <img src="/5.png" alt="Building Materials" className="w-full h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-lg md:text-xl font-light text-gray-300 mb-1">{t('sectors.buildingMaterials.category')}</h4>
                <h3 className="text-2xl md:text-3xl font-bold">{t('sectors.buildingMaterials.title')}</h3>
              </div>
            </div>
            {/* Cosmetics */}
            <div className="relative group rounded-2xl overflow-hidden shadow-xl animate-fadeInUp delay-400">
              <img src="/1.png" alt="Cosmetics" className="w-full h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-lg md:text-xl font-light text-gray-300 mb-1">{t('sectors.cosmetics.category')}</h4>
                <h3 className="text-2xl md:text-3xl font-bold">{t('sectors.cosmetics.title')}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

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
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
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
          </div>
        </div>
      </section>

      {/* Company Address & Map Section */}
      <section
        id="contact"
        ref={contactRef}
        className={`relative py-12 bg-white border-t border-b border-gray-200 fade-in-up-obs${isVisible['contact'] ? ' visible' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 md:gap-16 items-center">
          {/* Address & Contact Info */}
          <div className="flex-1 w-full max-w-xl animate-fadeInLeft">
            <div className="mb-4">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('contact.address.title')}</h3>
              <div className="text-gray-700 text-base md:text-lg mb-1">{t('contact.address.office')}</div>
              <div className="text-gray-700 text-base md:text-lg mb-1">{t('contact.address.mobile')}</div>
            </div>
            <div className="flex flex-col gap-2 text-gray-700 text-base md:text-lg">
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-blue-700" />
                <a href="tel:8662061093893" className="hover:underline text-blue-700">{t('contact.info.phone')}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-blue-700" />
                <a href="mailto:falconsmgr@hotmail.com" className="hover:underline text-blue-700">{t('contact.info.email')}</a>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-blue-700" />
                <span>{t('contact.info.hours.weekdays')}</span>
              </div>
              <div className="flex items-center gap-2 pl-6">
                <span>{t('contact.info.hours.saturday')}</span>
              </div>
            </div>
          </div>
          {/* Google Map */}
          <div className="flex-1 w-full max-w-xl animate-fadeInRight">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
              <iframe
                title="Falcons Capital Location"
                src="https://www.google.com/maps?q=Hua+Le+Lu,+Yuexiu,+Guangzhou,+Guangdong,+China&output=embed"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin"
              ></iframe>
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