import React, { useState, useEffect } from 'react';
import { SocialIcon } from 'react-social-icons';

export default function MyFooter() {
  const [showFooter, setShowFooter] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    setShowFooter(scrollTop + windowHeight >= fullHeight - 100 || windowHeight >= fullHeight);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <footer className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ${
      showFooter ? 'translate-y-0' : 'translate-y-full'
    }`}>
      <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200">
        <div className="container mx-auto px-6 py-2">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            {/* Social Icons */}
            <div className="flex items-center space-x-3">
              {[
                { url: "https://www.linkedin.com/in/shivakrishnareddyburra/", icon: "linkedin" },
                { url: "https://github.com/ShivaKrishnaReddyBurra", icon: "github" },
                { url: "https://www.facebook.com/shivakrishnareddy.burra/", icon: "facebook" },
                { url: "https://www.instagram.com/shivkrish_1624/", icon: "instagram" }
              ].map((social, index) => (
                <div key={index} className="group">
                  <SocialIcon 
                    url={social.url} 
                    bgColor="#6b7280"
                    fgColor="white"
                    className="w-8 h-8 hover:opacity-80 transition-opacity duration-200" 
                    target="_blank"
                  />
                </div>
              ))}
            </div>
            
            {/* Copyright */}
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                &copy; 2024 <span className="font-medium text-gray-900">SK Stories</span> - All Rights Reserved.
              </p>
            </div>
            
            {/* Scroll to top button */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center justify-center w-8 h-8 rounded-full 
                       bg-gray-900 text-white hover:bg-gray-700 
                       transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}