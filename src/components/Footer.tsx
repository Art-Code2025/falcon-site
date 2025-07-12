import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
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
            <div className="flex justify-center md:justify-start mb-2 group">
              <div className="relative">
                <img 
                  src="/logo.png" 
                  className="h-16 w-auto md:h-20 transition-transform duration-300 group-hover:scale-110" 
                  style={{filter:'drop-shadow(0 2px 8px #0002)'}} 
                />
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            <div className="text-gray-700 text-sm md:text-base max-w-md leading-relaxed">
              FALCONS is a registered trading company in Hong Kong, established in 2004 with over 15 years of experience in international trade.<br/><br/>
              We specialize in trading Furniture, Building materials and Cosmetics with direct supply from Chinese suppliers in Hong Kong and mainland China.<br/><br/>
              Our commitment to quality and customer satisfaction has made us a trusted partner for businesses worldwide.
            </div>
          </div>
          
          {/* Right: Enhanced Newsletter & Links */}
          <div className="flex flex-col gap-8 animate-fadeInRight delay-300">
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div className="group">
                <h4 className="font-semibold mb-2 text-gray-700 group-hover:text-blue-600 transition-colors duration-300">{t('footer.links.about')}</h4>
                <ul className="space-y-1 text-gray-600 text-sm">
                  {[
                    { key: 'about', label: t('navigation.about') },
                    { key: 'services', label: t('navigation.services') },
                    { key: 'portfolio', label: t('navigation.portfolio') },
                    { key: 'team', label: t('navigation.team') },
                    { key: 'reviews', label: t('navigation.reviews') },
                    { key: 'contact', label: t('navigation.contact') }
                  ].map((item, index) => (
                    <li key={item.key}>
                      <a 
                        href="#" 
                        className="hover:text-blue-700 transition-colors duration-200 hover:translate-x-1 inline-block"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {item.label}
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
                    V- Serviced Office, Rm E21 - Hua Le Building
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin size={14} className="text-blue-600" />
                    Hua Le Lu, Yuexiu, Guangzhou, Guangdong, China
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone size={14} className="text-blue-600" />
                    866-20-61093893 - Minna - Falcons
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail size={14} className="text-blue-600" />
                    falconsmgr@hotmail.com
                  </li>
                </ul>
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
            Website developed by ArtCode
          </span>
        </div>
      </div>
    </section>
  );
};

export default Footer; 