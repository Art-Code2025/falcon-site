import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronLeft, ChevronRight, Star, Phone, Mail, MapPin, Clock } from 'lucide-react';

const heroImages = [
  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=1920&q=80', // handshake
  'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=1920&q=80', // business meeting
  'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&w=1920&q=80', // team discussion
  'https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg?auto=compress&w=1920&q=80', // financial charts
  'https://images.pexels.com/photos/3183171/pexels-photo-3183171.jpeg?auto=compress&w=1920&q=80', // consulting
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [scrollY, setScrollY] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);

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

  // Hero image slider
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
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

      {/* Hero Section - Business/Consulting Slider */}
      <section id="home" className="relative min-h-screen flex items-center bg-gray-900 text-white overflow-hidden">
        {/* Auto Image Slider */}
        <div className="absolute inset-0 w-full h-full">
          {heroImages.map((img, idx) => (
            <img
              key={img}
              src={img}
              alt="Business Hero"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${heroIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              style={{ transitionProperty: 'opacity' }}
            />
          ))}
          <div className="absolute inset-0 bg-gray-900/60" />
        </div>
        {/* Hero Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center">
          <p className="text-blue-200 text-xs md:text-sm font-medium mb-4 tracking-widest uppercase animate-fadeInUp">
            PEOPLE ARE THE MOST IMPORTANT INVESTMENT
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-fadeInUp delay-300 drop-shadow-xl">
            WE MAKE
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed animate-fadeInUp delay-500">
            We are Falcons Capital and we empower Industrial Growth
          </p>
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 animate-fadeInUp delay-1000"
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

      {/* About/Transformative Investments Section */}
      <section id="about" className="py-12 md:py-20 bg-white relative overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Steps at the top */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-12 mb-10 md:mb-16">
            <div className="text-center">
              <div className="text-xs md:text-sm text-gray-400 italic">Transformative</div>
              <div className="text-base md:text-lg font-semibold tracking-wide text-gray-700">INVESTMENTS</div>
            </div>
            <div className="text-center">
              <div className="text-xs md:text-sm text-gray-400 italic">Strategic</div>
              <div className="text-base md:text-lg font-semibold tracking-wide text-gray-700">AMBITION</div>
            </div>
            <div className="text-center">
              <div className="text-xs md:text-sm text-gray-400 italic">Exceptional</div>
              <div className="text-base md:text-lg font-semibold tracking-wide text-gray-700">TEAMS</div>
            </div>
            <div className="text-center">
              <div className="text-xs md:text-sm text-gray-400 italic">Impactful</div>
              <div className="text-base md:text-lg font-semibold tracking-wide text-gray-700">RESULTS</div>
            </div>
          </div>
          {/* Main content */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
            {/* Left: Text */}
            <div className="animate-fadeInUp">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                <span className="italic font-normal">Transformative</span> Investments
              </h2>
              <p className="text-gray-700 text-base md:text-lg mb-6">
                Falcons Capital has driven meaningful change through strategic investments.
              </p>
              <p className="text-gray-500 text-sm md:text-base mb-8">
                Our visionary leadership, strategic partnerships, and focus on long-term value creation have fostered innovation and growth across various industries. We collaborate closely with our portfolio companies, ensuring their success and sustainability, empowering businesses to reach their full potential.
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow transition-all duration-300">
                Transform your business
                <ArrowRight size={18} />
              </button>
            </div>
            {/* Right: Image */}
            <div className="flex justify-center md:justify-end animate-fadeInUp delay-300">
              <img
                src="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&w=800&q=80"
                alt="City Skyline Business"
                className="rounded-3xl shadow-2xl w-full max-w-md object-cover border border-gray-100"
                style={{ minHeight: '260px', background: '#f3f4f6' }}
              />
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

      {/* Human Capital / Our Approach Section */}
      <section className="relative py-12 md:py-20 bg-gradient-to-b from-white to-gray-100 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
            {/* Left: Glassmorphism Card */}
            <div className="relative z-10 animate-fadeInLeft">
              <div className="backdrop-blur-strong bg-white/60 border border-gray-200 rounded-3xl shadow-2xl p-8 md:p-12">
                <div className="mb-6">
                  <span className="block text-xs md:text-sm text-blue-700 font-semibold tracking-widest mb-2">OUR APPROACH</span>
                  <h3 className="text-2xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                    Human Capital
                  </h3>
                  <p className="text-gray-700 text-base md:text-lg mb-4">
                    With nearly <span className="font-bold text-blue-700">30 years</span> of experience, we bring the best practices and lessons learned over <span className="font-bold text-blue-700">100 investments</span> to our partnerships.
                  </p>
                  <p className="text-gray-500 text-sm md:text-base mb-6">
                    We start by focusing on the team. We like to know what motivates our partners and what they are passionate about both inside and outside the office.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow transition-all duration-300">
                      Contact us
                      <ArrowRight size={18} />
                    </button>
                    <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 hover:bg-white text-blue-700 font-semibold border border-blue-700 shadow transition-all duration-300">
                      Read more
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
      <section className="relative py-12 md:py-20 bg-gray-900 text-white overflow-x-hidden">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{backgroundImage: `url('https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=1920&q=80')`}}></div>
        <div className="absolute inset-0 bg-gray-900/80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-10 md:mb-16">
            <h3 className="text-sm font-semibold mb-2 tracking-wider uppercase text-gray-300">TARGETED SECTORS</h3>
            <p className="text-gray-200 max-w-2xl text-sm md:text-base">
              We work with management teams and our Executive Advisors to implement customized investment strategies utilizing the best resources.
            </p>
          </div>
          {/* Sectors grid */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Distribution */}
            <div className="relative group rounded-2xl overflow-hidden shadow-xl animate-fadeInUp">
              <img src="https://images.pexels.com/photos/256219/pexels-photo-256219.jpeg?auto=compress&w=800&q=80" alt="Distribution" className="w-full h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-lg md:text-xl font-light text-gray-300 mb-1">Value-added</h4>
                <h3 className="text-2xl md:text-3xl font-bold">Distribution</h3>
              </div>
            </div>
            {/* Services */}
            <div className="relative group rounded-2xl overflow-hidden shadow-xl animate-fadeInUp delay-200">
              <img src="https://images.pexels.com/photos/256510/pexels-photo-256510.jpeg?auto=compress&w=800&q=80" alt="Services" className="w-full h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-lg md:text-xl font-light text-gray-300 mb-1">Industrial</h4>
                <h3 className="text-2xl md:text-3xl font-bold">Services</h3>
              </div>
            </div>
            {/* Products */}
            <div className="relative group rounded-2xl overflow-hidden shadow-xl animate-fadeInUp delay-400">
              <img src="https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&w=800&q=80" alt="Products" className="w-full h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-lg md:text-xl font-light text-gray-300 mb-1">Industrial</h4>
                <h3 className="text-2xl md:text-3xl font-bold">Products</h3>
              </div>
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

      {/* Newsletter & Footer Section */}
      <section className="relative pt-16 pb-8 md:pt-24 md:pb-12 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-400 overflow-x-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200/80 via-gray-300/60 to-gray-400/80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12 md:mb-20">
            {/* Left: Logo & Info */}
            <div className="flex flex-col gap-8 animate-fadeInLeft">
              <div className="flex items-center gap-4 mb-2">
                <img src="https://svgshare.com/i/14bA.svg" alt="Falcons Capital Logo" className="h-12 w-auto" style={{filter:'drop-shadow(0 2px 8px #0002)'}} />
                <span className="text-2xl md:text-3xl font-serif font-bold tracking-wider text-gray-800">FALCONS</span>
              </div>
              <div className="text-gray-700 text-sm md:text-base max-w-md">
                Falcons Capital Inc., including its various divisions and subsidiaries, operates as separate legal entities providing specialized consultancy services.<br/><br/>
                These services primarily encompass identifying, analyzing, and negotiating investment opportunities across various sectors in the US and globally.<br/><br/>
                Our follow-up activities include board memberships, financial oversight, and comprehensive reporting efforts, all aimed at ensuring the success and sustainability of our investments.
              </div>
            </div>
            {/* Right: Newsletter & Links */}
            <div className="flex flex-col gap-8 animate-fadeInRight delay-300">
              <div>
                <h3 className="text-lg font-semibold mb-3 tracking-wider uppercase text-gray-700">SIGN UP TO OUR NEWSLETTER:</h3>
                <form className="flex items-center bg-white/70 backdrop-blur-strong rounded-full p-2 shadow-lg max-w-xl">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 px-4 py-3 focus:outline-none text-lg italic"
                  />
                  <button type="submit" className="w-12 h-12 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-all duration-300">
                    <ArrowRight size={24} className="text-white" />
                  </button>
                </form>
                <div className="flex items-center mt-4">
                  <input type="checkbox" className="mr-3" />
                  <span className="text-sm text-gray-500">I have read and accept the Terms & Privacy</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                <div>
                  <h4 className="font-semibold mb-2 text-gray-700">About</h4>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li><a href="#" className="hover:text-blue-700 transition-colors">Portfolio</a></li>
                    <li><a href="#" className="hover:text-blue-700 transition-colors">Investments</a></li>
                    <li><a href="#" className="hover:text-blue-700 transition-colors">Partnering</a></li>
                    <li><a href="#" className="hover:text-blue-700 transition-colors">News</a></li>
                    <li><a href="#" className="hover:text-blue-700 transition-colors">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-gray-700">Contact</h4>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>10 S. Wacker Dr., Ste. 3300</li>
                    <li>Chicago, IL 60606</li>
                    <li>(312) 876-7267</li>
                    <li>info@falconscapital.com</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-gray-700">Legal</h4>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li><a href="#" className="hover:text-blue-700 transition-colors">Careers</a></li>
                    <li><a href="#" className="hover:text-blue-700 transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-blue-700 transition-colors">Terms of Service</a></li>
                  </ul>
                  <div className="mt-4">
                    <a href="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 hover:bg-blue-700 transition-colors">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 01-12 0 6 6 0 0112 0zm2 8v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Copyright */}
          <div className="border-t border-gray-300 pt-8 mt-8 text-center text-gray-600 text-sm">
            Copyright 2024 FALCONS Capital. All rights reserved. |
            <span className="ml-2">Privacy Policy and Disclosures by <span className="text-blue-700">FALCONS Capital</span></span>
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