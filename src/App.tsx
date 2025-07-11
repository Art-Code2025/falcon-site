import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, ArrowRight, ChevronLeft, ChevronRight, Star, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Footer from './components/Footer';
import { Helmet } from 'react-helmet';

const heroImages = [
  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=1920&q=80', // handshake
  'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=1920&q=80', // business meeting
  'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&w=1920&q=80', // team discussion
  'https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg?auto=compress&w=1920&q=80', // financial charts
  'https://images.pexels.com/photos/3183171/pexels-photo-3183171.jpeg?auto=compress&w=1920&q=80', // consulting
];

function App() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [scrollY, setScrollY] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState<Record<string, boolean>>({});

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

  useEffect(() => {
    const throttle = (func: () => void, limit: number) => {
      let inThrottle: boolean;
      return () => {
        if (!inThrottle) {
          func();
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    };
    const handleScroll = throttle(() => setScrollY(window.scrollY), 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated[entry.target.id]) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
            setHasAnimated(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const sections = document.querySelectorAll('[id]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [hasAnimated]);

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
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-30 animate-enhanced-float" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-30 animate-enhanced-float delay-1000" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Enhanced Steps at the top */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-12 mb-10 md:mb-16">
            <div className={`text-center fade-in-up-obs stagger-1 ${isVisible['about'] ? 'visible' : ''} hover:scale-105 transition-transform duration-300`}>
              <div className="text-xs md:text-sm text-gray-400 italic mb-1">{t('about.steps.transformative')}</div>
              <div className="text-base md:text-lg font-semibold tracking-wide text-gray-700 text-glow">{t('about.steps.investments')}</div>
            </div>
            <div className={`text-center fade-in-up-obs stagger-2 ${isVisible['about'] ? 'visible' : ''} hover:scale-105 transition-transform duration-300`}>
              <div className="text-xs md:text-sm text-gray-400 italic mb-1">{t('about.steps.strategic')}</div>
              <div className="text-base md:text-lg font-semibold tracking-wide text-gray-700 text-glow">{t('about.steps.ambition')}</div>
            </div>
            <div className={`text-center fade-in-up-obs stagger-3 ${isVisible['about'] ? 'visible' : ''} hover:scale-105 transition-transform duration-300`}>
              <div className="text-xs md:text-sm text-gray-400 italic mb-1">{t('about.steps.exceptional')}</div>
              <div className="text-base md:text-lg font-semibold tracking-wide text-gray-700 text-glow">{t('about.steps.teams')}</div>
            </div>
            <div className={`text-center fade-in-up-obs stagger-4 ${isVisible['about'] ? 'visible' : ''} hover:scale-105 transition-transform duration-300`}>
              <div className="text-xs md:text-sm text-gray-400 italic mb-1">{t('about.steps.impactful')}</div>
              <div className="text-base md:text-lg font-semibold tracking-wide text-gray-700 text-glow">{t('about.steps.results')}</div>
            </div>
          </div>
          
          {/* Main content with enhanced animations */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
            {/* Left: Text with enhanced effects */}
            <div className="relative">
              {/* Decorative line */}
              <div className="absolute top-0 left-0 w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-8" />
              
              <h2 className={`text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 fade-in-up-obs stagger-5 ${isVisible['about'] ? 'visible' : ''}`}> 
                <span className="italic font-normal text-blue-600">{t('about.steps.transformative')}</span> {t('about.steps.investments')}
              </h2>
              <p className={`text-gray-700 text-base md:text-lg mb-6 fade-in-up-obs stagger-6 ${isVisible['about'] ? 'visible' : ''} leading-relaxed`}>{t('about.subtitle')}</p>
              <p className={`text-gray-500 text-sm md:text-base mb-8 fade-in-up-obs stagger-7 ${isVisible['about'] ? 'visible' : ''} leading-relaxed`}>{t('about.description')}</p>
              <button className={`inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg transition-all duration-300 fade-in-up-obs stagger-8 ${isVisible['about'] ? 'visible' : ''} hover:scale-105 hover:shadow-blue-500/25 btn-shine`}>
                {t('about.ctaButton')}
                <ArrowRight size={18} className="animate-pulse" />
              </button>
            </div>
            
            {/* Right: Enhanced Image with effects */}
            <div className={`flex justify-center md:justify-end fade-in-up-obs stagger-9 ${isVisible['about'] ? 'visible' : ''} relative`}> 
              <div className="relative group">
                <img 
                  src="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&w=800&q=80" 
                  alt="City Skyline Business" 
                  className="rounded-3xl shadow-2xl w-full max-w-md object-cover border border-gray-100 transition-all duration-500 group-hover:scale-105 group-hover:shadow-3d" 
                  style={{ minHeight: '260px', background: '#f3f4f6' }} 
                />
                {/* Overlay effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-enhanced-float" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full animate-enhanced-float delay-1000" />
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
        <div className="absolute top-20 left-10 w-24 h-24 bg-green-100 rounded-full blur-3xl opacity-30 animate-enhanced-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-30 animate-enhanced-float delay-1500" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 md:mb-16">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 transition-all duration-1000 fade-in-up-obs stagger-1 ${isVisible['services'] ? 'visible' : ''} text-glow-strong`}>
              {t('services.title')}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 animate-fadeInUp delay-200">{t('services.subtitle')}</p>
          </div>

          {/* Enhanced Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-2 fade-in-up-obs stagger-2${isVisible['services'] ? ' visible' : ''} group hover:scale-105`}>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded transform rotate-45"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 text-glow">{t('services.consulting.title')}</h3>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
                {t('services.consulting.description')}
              </p>
              <p className="text-xs md:text-sm text-gray-500">
                {t('services.consulting.subtitle')}
              </p>
            </div>
            
            <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-2 delay-200 fade-in-up-obs stagger-3${isVisible['services'] ? ' visible' : ''} group hover:scale-105`}>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 text-glow">{t('services.support.title')}</h3>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
                {t('services.support.description')}
              </p>
              <p className="text-xs md:text-sm text-gray-500">
                {t('services.support.subtitle')}
              </p>
            </div>
            
            <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-2 delay-400 sm:col-span-2 lg:col-span-1 fade-in-up-obs stagger-4${isVisible['services'] ? ' visible' : ''} group hover:scale-105`}>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-sm transform rotate-12"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 text-glow">{t('services.services.title')}</h3>
              <div className="text-gray-600 mb-4 md:mb-6 text-left text-xs md:text-sm">
                {(t('services.services.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <p key={index} className="mb-2 flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 flex-shrink-0"></span>
                    {item}
                  </p>
                ))}
              </div>
              <p className="text-xs md:text-sm text-gray-500">
                {t('services.services.subtitle')}
              </p>
            </div>
          </div>

          {/* Enhanced Large Image Section */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            <div 
              className="h-64 md:h-96 bg-cover bg-center relative transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url('https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop')`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent group-hover:from-gray-900/70 transition-all duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-glow-strong">{t('services.cta.title')}</h3>
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base hover:scale-105 hover:shadow-blue-500/25 btn-shine">
                    {t('services.cta.button')}
                  </button>
                </div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute top-4 right-4 w-6 h-6 bg-white/20 rounded-full animate-enhanced-float" />
            <div className="absolute bottom-4 left-4 w-4 h-4 bg-white/20 rounded-full animate-enhanced-float delay-1000" />
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
                      {t('humanCapital.buttons.contact')}
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
                src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=900&q=80"
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
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{backgroundImage: `url('https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=1920&q=80')`}}></div>
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
            {/* Distribution */}
            <div className="relative group rounded-2xl overflow-hidden shadow-xl animate-fadeInUp">
              <img src="https://images.pexels.com/photos/256219/pexels-photo-256219.jpeg?auto=compress&w=800&q=80" alt="Distribution" className="w-full h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-lg md:text-xl font-light text-gray-300 mb-1">{t('sectors.distribution.category')}</h4>
                <h3 className="text-2xl md:text-3xl font-bold">{t('sectors.distribution.title')}</h3>
              </div>
            </div>
            {/* Services */}
            <div className="relative group rounded-2xl overflow-hidden shadow-xl animate-fadeInUp delay-200">
              <img src="https://images.pexels.com/photos/256510/pexels-photo-256510.jpeg?auto=compress&w=800&q=80" alt="Services" className="w-full h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-lg md:text-xl font-light text-gray-300 mb-1">{t('sectors.services.category')}</h4>
                <h3 className="text-2xl md:text-3xl font-bold">{t('sectors.services.title')}</h3>
              </div>
            </div>
            {/* Products */}
            <div className="relative group rounded-2xl overflow-hidden shadow-xl animate-fadeInUp delay-400">
              <img src="https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&w=800&q=80" alt="Products" className="w-full h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-lg md:text-xl font-light text-gray-300 mb-1">{t('sectors.products.category')}</h4>
                <h3 className="text-2xl md:text-3xl font-bold">{t('sectors.products.title')}</h3>
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
              <span className="block text-xl md:text-2xl font-normal text-gray-600">{t('team.subtitle')}</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto mb-12 md:mb-16">
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

          {/* Client Testimonials */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
              <div className="flex mb-3 md:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-400 fill-current md:w-4 md:h-4" />
                ))}
              </div>
              <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
                "{t('team.testimonials.client1.text')}"
              </p>
              <div className="font-semibold text-gray-900 text-sm md:text-base">- {t('team.testimonials.client1.author')}</div>
            </div>
            
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
              <div className="flex mb-3 md:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-400 fill-current md:w-4 md:h-4" />
                ))}
              </div>
              <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
                "{t('team.testimonials.client2.text')}"
              </p>
              <div className="font-semibold text-gray-900 text-sm md:text-base">- {t('team.testimonials.client2.author')}</div>
            </div>
            
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg sm:col-span-2 lg:col-span-1">
              <div className="flex mb-3 md:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-400 fill-current md:w-4 md:h-4" />
                ))}
              </div>
              <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
                "{t('team.testimonials.client3.text')}"
              </p>
              <div className="font-semibold text-gray-900 text-sm md:text-base">- {t('team.testimonials.client3.author')}</div>
            </div>
          </div>

          {/* Company Logos */}
          <div className="mt-12 md:mt-16 text-center">
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 opacity-60">
              <div className="text-lg md:text-2xl font-bold text-gray-400">Technologies</div>
              <div className="text-lg md:text-2xl font-bold text-gray-400">duo.fi</div>
              <div className="text-lg md:text-2xl font-bold text-gray-400">BRAND</div>
              <div className="text-lg md:text-2xl font-bold text-gray-400">LOGO</div>
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