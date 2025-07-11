import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronLeft, ChevronRight, Star, Phone, Mail, MapPin, Clock } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[id]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation - Transparent with Blur */}
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

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center bg-gray-900 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/90"></div>
        
        {/* 3D Geometric Elements - Hidden on mobile */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 opacity-30 animate-float hidden md:block">
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 transform rotate-45 rounded-lg shadow-2xl"></div>
        </div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 opacity-20 animate-float hidden md:block" style={{animationDelay: '2s'}}>
          <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 transform rotate-12 rounded shadow-2xl"></div>
        </div>
        
        {/* Large 3D Triangle - Hidden on mobile */}
        <div className="absolute right-20 top-1/2 transform -translate-y-1/2 opacity-40 hidden lg:block">
          <div className="relative">
            <div className="w-0 h-0 border-l-[100px] border-r-[100px] border-b-[150px] border-l-transparent border-r-transparent border-b-gradient-to-r from-blue-400 to-blue-600 shadow-2xl"></div>
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[80px] border-r-[80px] border-b-[120px] border-l-transparent border-r-transparent border-b-gray-300 shadow-inner"></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <p className="text-blue-400 text-sm font-medium mb-6 tracking-widest uppercase animate-fadeInUp text-center md:text-left">
              PEOPLE ARE THE MOST IMPORTANT INVESTMENT
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-8 leading-tight animate-fadeInUp delay-300 text-center md:text-left">
              <span className="block">WE BUILD</span>
              <span className="block">BUSINESS</span>
              <span className="block text-blue-400">WITH YOU</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed animate-fadeInUp delay-500 text-center md:text-left">
              We are FALCONS and we empower Industrial Growth
            </p>
            <div className="text-center md:text-left">
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 md:px-10 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center animate-fadeInUp delay-1000 shadow-2xl"
              >
                Contact us
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Indicators - Hidden on mobile */}
        <div className="absolute bottom-8 left-0 right-0 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-px h-8 bg-gray-600"></div>
                <span>Investment Criteria</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>Partnering With FALCONS</span>
                <div className="w-px h-8 bg-gray-600"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-20 bg-gray-100 relative">
        {/* Diagonal White Section */}
        <div className="absolute top-0 left-0 w-full h-16 md:h-32 bg-white transform -skew-y-2 origin-top-left"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className={`transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="mb-6 md:mb-8">
                <p className="text-blue-600 text-sm font-medium mb-4 tracking-wider uppercase">About Us</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Driving transformation through
                  <span className="block text-blue-600">Strategic Investment</span>
                  <span className="block">for nearly</span>
                  <span className="block italic text-gray-600">15 Years</span>
                </h2>
              </div>
              
              <div className="mb-6 md:mb-8">
                <div className="flex items-center mb-6">
                  <div className="text-4xl md:text-6xl font-bold text-blue-600 mr-4 md:mr-6">15</div>
                  <div>
                    <p className="text-base md:text-lg font-semibold text-gray-900">Years</p>
                    <p className="text-gray-600">of Excellence</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                  We are a registered trading company in Hong Kong. Our company was established in 2004, and we have over 15 years of experience in international trade. Our areas of business include trading in Furniture, Building materials, and Cosmetics.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
                  We supply to our customers directly from Chinese suppliers in Hong Kong and mainland China, ensuring quality and competitive pricing for all our partners.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200 border-b border-blue-600">
                  Read more
                </button>
                <div className="hidden sm:block w-px h-6 bg-gray-400"></div>
                <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
                  News & Insights
                </button>
              </div>
            </div>
            
            <div className={`transition-all duration-1000 delay-300 ${isVisible.about ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative">
                {/* Large 3D Triangle - Hidden on mobile */}
                <div className="absolute -top-16 -right-16 opacity-20 hidden md:block">
                  <div className="w-0 h-0 border-l-[120px] border-r-[120px] border-b-[180px] border-l-transparent border-r-transparent border-b-gray-300"></div>
                </div>
                
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl relative z-10">
                  <div className="mb-6">
                    <h3 className="text-blue-600 text-sm font-medium mb-2 tracking-wider uppercase">OUR APPROACH</h3>
                  </div>
                  
                  <div className="mb-6 md:mb-8">
                    <p className="text-gray-600 mb-4 text-sm md:text-base">
                      With nearly <strong>15 years</strong> of experience, we bring the best practices and lessons learned over <strong>100 investments</strong> to our partnerships.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                    <div className="text-center p-3 md:p-4 bg-gray-50 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-blue-600 mb-1">2004</div>
                      <div className="text-xs text-gray-600 uppercase tracking-wide">ESTABLISHED</div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-gray-50 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-blue-600 mb-1">3</div>
                      <div className="text-xs text-gray-600 uppercase tracking-wide">BUSINESS AREAS</div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-gray-50 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-blue-600 mb-1">HK</div>
                      <div className="text-xs text-gray-600 uppercase tracking-wide">REGISTERED</div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-gray-50 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-blue-600 mb-1">CN</div>
                      <div className="text-xs text-gray-600 uppercase tracking-wide">SUPPLIERS</div>
                    </div>
                  </div>
                  
                  <h4 className="text-base md:text-lg font-bold text-gray-900 mb-4">Our Business Areas</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700 text-sm md:text-base">Furniture Trading</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700 text-sm md:text-base">Building Materials</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700 text-sm md:text-base">Cosmetics</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 transition-all duration-1000 ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Transformative Investments
            </h2>
            <p className="text-lg md:text-xl text-gray-600">The finest business consulting services in the area</p>
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-2 ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded transform rotate-45"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">CONSULTING</h3>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                We provide free consultation to our customers to select the ideal supplier and provide certain advice to maintain mutual benefits.
              </p>
              <p className="text-xs md:text-sm text-gray-500">
                Financial advice that can save you time and money.
              </p>
            </div>
            
            <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-2 delay-200 ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">SUPPORT</h3>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                We support our customers in every step of orders made and confirmed and provide after-sales services to ensure customer satisfaction.
              </p>
              <p className="text-xs md:text-sm text-gray-500">
                Comprehensive support throughout your business journey.
              </p>
            </div>
            
            <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-2 delay-400 sm:col-span-2 lg:col-span-1 ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-sm transform rotate-12"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">SERVICES</h3>
              <div className="text-gray-600 mb-4 md:mb-6 text-left text-xs md:text-sm">
                <p className="mb-2">• Search for products from actual suppliers</p>
                <p className="mb-2">• Provide alternative prices based on quality</p>
                <p className="mb-2">• Product inspection before delivery</p>
                <p className="mb-2">• Check all official documents</p>
                <p>• Provide certificates for special products</p>
              </div>
              <p className="text-xs md:text-sm text-gray-500">
                Marketing experience that counts when reaching your customer base.
              </p>
            </div>
          </div>

          {/* Large Image Section */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div 
              className="h-64 md:h-96 bg-cover bg-center relative"
              style={{
                backgroundImage: `url('https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop')`
              }}
            >
              <div className="absolute inset-0 bg-gray-900/60"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Transform your business</h3>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Meeting Section */}
      <section className="py-12 md:py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-blue-900/20 to-gray-900"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="mb-6 md:mb-8">
                <h3 className="text-blue-400 text-sm font-medium mb-2 tracking-wider uppercase">OUR APPROACH</h3>
                <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base">
                  With nearly <strong className="text-white">15 years</strong> of experience, we bring the best practices and lessons learned over <strong className="text-white">100 investments</strong> to our partnerships.
                </p>
              </div>
              
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 mb-6 md:mb-8 text-sm md:text-base">
                Contact us
              </button>

              {/* Navigation Arrows */}
              <div className="flex space-x-3 md:space-x-4">
                <button className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                  <ChevronLeft size={16} className="md:w-5 md:h-5" />
                </button>
                <button className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                  <ChevronRight size={16} className="md:w-5 md:h-5" />
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div 
                className="h-60 md:h-80 bg-cover bg-center rounded-2xl relative overflow-hidden"
                style={{
                  backgroundImage: `url('https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop')`
                }}
              >
                <div className="absolute inset-0 bg-gray-900/40"></div>
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                  <div className="bg-gray-900/80 backdrop-blur-md rounded-lg p-4 md:p-6">
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2">Human Capital</h4>
                    <p className="text-gray-300 text-xs md:text-sm mb-3 md:mb-4">
                      We start by focusing on the team. We like to know what motivates our partners and what they are passionate about both inside and outside the office.
                    </p>
                    <button className="text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-200 border-b border-blue-400 text-sm md:text-base">
                      Read more
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Targeted Sectors Section */}
      <section className="py-12 md:py-20 bg-gray-800 text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gray-900/80"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-12 md:mb-16">
            <h3 className="text-sm font-medium mb-3 md:mb-4 tracking-wider uppercase text-gray-400">TARGETED SECTORS</h3>
            <p className="text-gray-300 max-w-2xl text-sm md:text-base">
              We work with management teams and our Executive Advisors to implement customized investment strategies utilizing the best resources.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="mb-4 md:mb-6">
                <h4 className="text-base md:text-lg font-light text-gray-400 mb-2">Value-added</h4>
                <h3 className="text-3xl md:text-4xl font-bold">Distribution</h3>
              </div>
              <button className="text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-200 text-sm md:text-base">
                Read more
              </button>
            </div>
            
            <div className="text-center">
              <div className="mb-4 md:mb-6">
                <h4 className="text-base md:text-lg font-light text-gray-400 mb-2">Industrial</h4>
                <h3 className="text-3xl md:text-4xl font-bold">Services</h3>
              </div>
              <button className="text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-200 text-sm md:text-base">
                Read more
              </button>
            </div>
            
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="mb-4 md:mb-6">
                <h4 className="text-base md:text-lg font-light text-gray-400 mb-2">Industrial</h4>
                <h3 className="text-3xl md:text-4xl font-bold">Products</h3>
              </div>
              <button className="text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-200 text-sm md:text-base">
                Read more
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-12 md:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 transition-all duration-1000 ${isVisible.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Testimonials
              <span className="block text-xl md:text-2xl font-normal text-gray-600">& Client Success Stories</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto mb-12 md:mb-16">
            <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-2 ${isVisible.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 md:w-6 md:h-6 bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Zailai Shouki</h3>
              <p className="text-blue-600 font-semibold mb-3 md:mb-4 text-sm md:text-base">Director</p>
              <p className="text-gray-600 text-sm md:text-base">
                Leading the company with over 15 years of experience in international trade and business development, driving strategic growth and partnerships.
              </p>
            </div>
            
            <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-2 delay-200 ${isVisible.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 md:w-6 md:h-6 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Minna Gou</h3>
              <p className="text-blue-600 font-semibold mb-3 md:mb-4 text-sm md:text-base">Marketing Assistant</p>
              <p className="text-gray-600 text-sm md:text-base">
                Dedicated to providing excellent customer service and supporting our clients throughout their business journey with personalized attention.
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
                "FALCONS provided exceptional service and helped us find the perfect suppliers for our furniture business. Their expertise saved us time and money."
              </p>
              <div className="font-semibold text-gray-900 text-sm md:text-base">- Business Client</div>
            </div>
            
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
              <div className="flex mb-3 md:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-400 fill-current md:w-4 md:h-4" />
                ))}
              </div>
              <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
                "Outstanding support throughout our entire order process. The quality inspection and documentation services are top-notch."
              </p>
              <div className="font-semibold text-gray-900 text-sm md:text-base">- Trading Partner</div>
            </div>
            
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg sm:col-span-2 lg:col-span-1">
              <div className="flex mb-3 md:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-400 fill-current md:w-4 md:h-4" />
                ))}
              </div>
              <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
                "Professional, reliable, and always delivers on promises. FALCONS has been our trusted partner for building materials for years."
              </p>
              <div className="font-semibold text-gray-900 text-sm md:text-base">- Construction Company</div>
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

      {/* Newsletter Section */}
      <section className="py-12 md:py-20 bg-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900"></div>
        
        {/* Large 3D Geometric Elements - Hidden on mobile */}
        <div className="absolute top-0 left-0 w-64 h-64 opacity-10 hidden md:block">
          <div className="w-0 h-0 border-l-[200px] border-r-[200px] border-b-[300px] border-l-transparent border-r-transparent border-b-gray-600"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="flex items-center mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded mr-2 md:mr-3 flex items-center justify-center">
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-white transform rotate-45 rounded-sm"></div>
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold tracking-wider">FALCONS</h1>
                  <p className="text-xs text-gray-400 tracking-widest">CAPITAL</p>
                </div>
              </div>
              
              <div className="space-y-3 md:space-y-4 text-gray-300 text-sm md:text-base">
                <p>
                  FALCONS Capital Inc., including its various divisions and subsidiaries, operates as separate legal entities providing specialized consultancy services.
                </p>
                <p>
                  These services primarily encompass identifying, analyzing, and negotiating investment opportunities across various sectors in the US and globally.
                </p>
                <p>
                  Our follow-up activities include board memberships, financial oversight, and comprehensive reporting efforts, all aimed at ensuring the success and sustainability of our investments.
                </p>
              </div>
            </div>
            
            <div>
              <div className="mb-6 md:mb-8">
                <h3 className="text-sm font-medium mb-3 md:mb-4 tracking-wider uppercase text-gray-400">SIGN UP TO OUR NEWSLETTER:</h3>
                <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full p-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent text-white placeholder-gray-400 px-3 md:px-4 py-2 focus:outline-none text-sm md:text-lg italic"
                  />
                  <button className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                    <ArrowRight size={16} className="md:w-5 md:h-5" />
                  </button>
                </div>
                <div className="flex items-center mt-3 md:mt-4">
                  <input type="checkbox" className="mr-2 md:mr-3" />
                  <span className="text-xs md:text-sm text-gray-400">I have read and accept the Terms & Privacy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-20 bg-gray-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Contact Info Columns */}
            <div>
              <h4 className="font-semibold mb-4 md:mb-6 text-base md:text-lg">About</h4>
              <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base">
                <li><a href="#" className="hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Investments</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partnering</a></li>
                <li><a href="#" className="hover:text-white transition-colors">News</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 md:mb-6 text-base md:text-lg">Contact</h4>
              <div className="space-y-3 md:space-y-4 text-gray-400 text-sm md:text-base">
                <div>
                  <p className="font-medium text-white">V- Serviced Office, Rm E21 - Hua Le Building</p>
                  <p>Hua Le Lu, Yuexiu, Guangzhou, Guangdong, China</p>
                </div>
                <div>
                  <p>Mobile: +86-13710404949</p>
                  <p>Office: 866-20-61093893</p>
                </div>
                <div>
                  <p>falconsmgr@hotmail.com</p>
                </div>
              </div>
            </div>
            
            <div className="sm:col-span-2 lg:col-span-1">
              <h4 className="font-semibold mb-4 md:mb-6 text-base md:text-lg">Legal</h4>
              <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base">
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
              
              <div className="mt-6 md:mt-8">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-white rounded"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 md:pt-8 mt-8 md:mt-12 text-center">
            <p className="text-gray-400 text-sm md:text-base">
              Copyright 2024 FALCONS Capital. All rights reserved. | 
              <span className="ml-2">Privacy Policy and Disclosures by <span className="text-blue-400">FALCONS Capital</span></span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;