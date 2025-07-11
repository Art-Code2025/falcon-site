import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, ArrowRight, ChevronLeft, ChevronRight, Star, Phone, Mail, MapPin, Clock } from 'lucide-react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [scrollY, setScrollY] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);

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

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Helmet>
        <title>Falcons Capital - Business Consulting & Investments</title>
        <meta name="description" content="Falcons Capital empowers industrial growth through strategic investments and business consulting services." />
      </Helmet>
      {/* Navigation - Transparent with Blur */}
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} scrollToSection={scrollToSection} />
      <Hero heroImages={heroImages} heroIndex={heroIndex} scrollToSection={scrollToSection} />

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

      {/* Company Address & Map Section */}
      <section className="relative py-12 bg-white border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 md:gap-16 items-center">
          {/* Address & Contact Info */}
          <div className="flex-1 w-full max-w-xl animate-fadeInLeft">
            <div className="mb-4">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Hua Le Lu, Yuexiu, Guangzhou, Guangdong, China</h3>
              <div className="text-gray-700 text-base md:text-lg mb-1">V- Serviced Office , Rm E21 - Hua Le Building</div>
              <div className="text-gray-700 text-base md:text-lg mb-1">Mobile: +86-13710404949</div>
            </div>
            <div className="flex flex-col gap-2 text-gray-700 text-base md:text-lg">
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-blue-700" />
                <a href="tel:8662061093893" className="hover:underline text-blue-700">866-20-61093893 - Minna - Falcons</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-blue-700" />
                <a href="mailto:falconsmgr@hotmail.com" className="hover:underline text-blue-700">falconsmgr@hotmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-blue-700" />
                <span>Monday To Friday 9am to 6pm</span>
              </div>
              <div className="flex items-center gap-2 pl-6">
                <span>Saturday 9am To 1pm</span>
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

     
    </div>
  );
}

export default App;