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
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 text-center">
          {/* Main Title */}
          <div className="mb-16">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-gray-900 tracking-tight">
              QUADRA
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              A collection of stories exploring adventure, mystery, and the depths of human experience.
            </p>
            
            {/* Decorative line */}
            <div className="w-24 h-px bg-gray-300 mx-auto mb-8"></div>
            
            {/* Author info */}
            <p className="text-gray-500 font-medium">
              Written by Shiva Krishna Reddy
            </p>
          </div>
          
          {/* Call to action */}
        </div>
      </div>
      
      {/* Chapters Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Latest Chapters
          </h2>
          <div className="w-16 h-px bg-gray-300 mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl">
            Follow the ongoing story as new chapters are published regularly.
          </p>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-6">
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