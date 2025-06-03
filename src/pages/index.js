import React, { useEffect, useState } from 'react';
import ChapterList from '../components/ChapterList';
import MyNavbar from '../components/MyNavbar';
import MyFooter from '../components/MyFooter';
import CharacterGallery from '../components/CharacterGallery';

export default function Home() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/chapters')
      .then(res => res.json())
      .then(data => {
        setChapters(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching chapters:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <MyNavbar />
      
      {/* Hero Section */}
      <div className="pt-20 sm:pt-24">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Title */}
          <div className="mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 sm:mb-6 text-gray-900 tracking-tight">
              QUADRA
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
              A collection of stories exploring adventure, mystery, and the depths of human experience.
            </p>
            
            {/* Decorative line */}
            <div className="w-16 sm:w-24 h-px bg-gray-300 mx-auto mb-6 sm:mb-8"></div>
            
            {/* Author info */}
            <p className="text-gray-500 font-medium text-sm sm:text-base">
              Written by Shiva Krishna Reddy
            </p>
          </div>
        </div>
      </div>
      
      {/* Chapters Section */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Latest Chapters
          </h2>
          <div className="w-12 sm:w-16 h-px bg-gray-300 mb-4 sm:mb-6"></div>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl">
            Follow the ongoing story as new chapters are published regularly.
          </p>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-16 sm:py-20">
            <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            <ChapterList chapters={chapters} />
          </div>
        )}
      </div>
      
      {/* Character Gallery */}
      <CharacterGallery />      
      <MyFooter />
    </div>
  );
}