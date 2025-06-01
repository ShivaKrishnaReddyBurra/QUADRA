import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MyNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="group cursor-pointer">
              <h1 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
                SK Stories
              </h1>
              <div className="h-0.5 w-0 group-hover:w-full bg-gray-400 transition-all duration-300"></div>
            </div>
          </Link>
          
          <div className="flex items-center space-x-6">
            <a 
              href="mailto:reddyburrashivakrishna@gmail.com" 
              className="px-4 py-2 text-gray-700 font-medium border border-gray-300 rounded-lg
                       hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}