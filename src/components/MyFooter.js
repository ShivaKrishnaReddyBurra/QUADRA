import React, { useState, useEffect } from 'react';
import { SocialIcon } from 'react-social-icons';

export default function MyFooter() {
  // const [showFooter, setShowFooter] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    // Show footer when near bottom or when content is short
    // setShowFooter(scrollTop + windowHeight >= fullHeight - 100 || windowHeight >= fullHeight - 50);
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
    <footer className={`relative bottom-0 left-0 right-0 z-30 transition-all duration-500 `}>
      <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            
            {/* Social Icons */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 order-2 sm:order-1">
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
                    className="w-6 h-6 sm:w-7 sm:h-7 hover:opacity-80 transition-opacity duration-200" 
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                </div>
              ))}
            </div>
            
            {/* Copyright */}
            <div className="text-center order-1 sm:order-2">
              <p className="text-gray-600 text-xs sm:text-sm">
                &copy; 2024 <span className="font-medium text-gray-900">SK Stories</span>
              </p>
            </div>
            
            {/* Scroll to top button */}
            <div className="order-3 sm:order-3">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full 
                         bg-gray-900 text-white hover:bg-gray-700 
                         transition-colors duration-200"
                aria-label="Scroll to top"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}