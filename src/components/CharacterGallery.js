import React from 'react';
import CustomImage from './CustomImage';

export default function CharacterGallery() {
  const characters = [
    {
      src: '/images/kozo.png',
      alt: 'Kozo Zentos',
      name: 'Kozo Zentos',
      description: 'The brave protagonist of our story'
    },
    {
      src: '/images/shiron.png',
      alt: 'Shiron',
      name: 'Shiron',
      description: 'A mysterious and powerful ally'
    },
    {
      src: '/images/nichuki.png',
      alt: 'Nichuki',
      name: 'Nichuki',
      description: 'The wise mentor with ancient secrets'
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Meet the Characters
          </h2>
          <div className="w-12 sm:w-16 h-px bg-gray-300 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
            The compelling individuals who drive our narrative forward
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {characters.map((character, index) => (
            <div key={index} className="group">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden 
                            shadow-sm hover:shadow-md transition-shadow duration-200">
                
                {/* Character Image */}
                <div className="aspect-square overflow-hidden">
                  <CustomImage
                    src={character.src}
                    alt={character.alt}
                    className="w-full h-full object-cover group-hover:scale-105 
                             transition-transform duration-300"
                  />
                </div>
                
                {/* Character Info */}
                <div className="p-4 sm:p-6 text-center">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    {character.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {character.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}