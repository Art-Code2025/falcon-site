import React, { useState } from 'react';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
    }, 2000);
  };
  
  return (
    <section className="relative pt-16 pb-8 md:pt-24 md:pb-12 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-400 overflow-x-hidden">
      {/* Enhanced background with animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200/80 via-gray-300/60 to-gray-400/80"></div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-enhanced-float" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-enhanced-float delay-1000" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12 md:mb-20">
          {/* Left: Enhanced Logo & Info */}
          <div className="flex flex-col gap-8 animate-fadeInLeft">
            <div className="flex items-center gap-4 mb-2 group">
              <div className="relative">
                <img 
                  src="/logo.png" 
                  alt="Falcons Logo" 
                  className="h-16 w-auto md:h-20 transition-transform duration-300 group-hover:scale-110" 
                  style={{filter:'drop-shadow(0 2px 8px #0002)'}} 
                />
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-2xl md:text-3xl font-serif font-bold tracking-wider text-gray-800 group-hover:text-blue-600 transition-colors duration-300">FALCONS</span>
            </div>
            <div className="text-gray-700 text-sm md:text-base max-w-md leading-relaxed">
              Falcons Capital Inc., including its various divisions and subsidiaries, operates as separate legal entities providing specialized consultancy services.<br/><br/>
              These services primarily encompass identifying, analyzing, and negotiating investment opportunities across various sectors in the US and globally.<br/><br/>
              Our follow-up activities include board memberships, financial oversight, and comprehensive reporting efforts, all aimed at ensuring the success and sustainability of our investments.
            </div>
          </div>
          
          {/* Right: Enhanced Newsletter & Links */}
          <div className="flex flex-col gap-8 animate-fadeInRight delay-300">
            <div>
              <h3 className="text-lg font-semibold mb-3 tracking-wider uppercase text-gray-700 text-glow">{t('footer.newsletter.title')}</h3>
              <form onSubmit={handleSubmit} className="flex items-center bg-white/70 backdrop-blur-strong rounded-full p-2 shadow-lg max-w-xl group hover:shadow-xl transition-all duration-300">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletter.placeholder')}
                  className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 px-4 py-3 focus:outline-none text-lg italic"
                  required
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 hover:scale-110'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ArrowRight size={24} className="text-white" />
                  )}
                </button>
              </form>
              <div className="flex items-center mt-4">
                <input type="checkbox" className="mr-3 accent-blue-600" />
                <span className="text-sm text-gray-500">{t('footer.newsletter.terms')}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
              <div className="group">
                <h4 className="font-semibold mb-2 text-gray-700 group-hover:text-blue-600 transition-colors duration-300">{t('footer.links.about')}</h4>
                <ul className="space-y-1 text-gray-600 text-sm">
                  {['Portfolio', 'Investments', 'Partnering', 'News', 'Contact'].map((item, index) => (
                    <li key={index}>
                      <a 
                        href="#" 
                        className="hover:text-blue-700 transition-colors duration-200 hover:translate-x-1 inline-block"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="group">
                <h4 className="font-semibold mb-2 text-gray-700 group-hover:text-blue-600 transition-colors duration-300">{t('footer.links.contact')}</h4>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li className="flex items-center gap-2">
                    <MapPin size={14} className="text-blue-600" />
                    10 S. Wacker Dr., Ste. 3300
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin size={14} className="text-blue-600" />
                    Chicago, IL 60606
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone size={14} className="text-blue-600" />
                    (312) 876-7267
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail size={14} className="text-blue-600" />
                    info@falconscapital.com
                  </li>
                </ul>
              </div>
              
              <div className="group">
                <h4 className="font-semibold mb-2 text-gray-700 group-hover:text-blue-600 transition-colors duration-300">{t('footer.links.legal')}</h4>
                <ul className="space-y-1 text-gray-600 text-sm">
                  {['Careers', 'Privacy Policy', 'Terms of Service'].map((item, index) => (
                    <li key={index}>
                      <a 
                        href="#" 
                        className="hover:text-blue-700 transition-colors duration-200 hover:translate-x-1 inline-block"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <a 
                    href="#" 
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 01-12 0 6 6 0 0112 0zm2 8v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Copyright */}
        <div className="border-t border-gray-300 pt-8 mt-8 text-center text-gray-600 text-sm">
          <span className="hover:text-blue-600 transition-colors duration-300 cursor-pointer">
            {t('footer.copyright')}
          </span> |
          <span className="ml-2 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
            {t('footer.privacy')}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Footer; 