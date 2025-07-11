import React from 'react';
import { ArrowRight } from 'lucide-react';

const Footer: React.FC = () => (
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
);

export default Footer; 