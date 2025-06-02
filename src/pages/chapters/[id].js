import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MyNavbar from '../../components/MyNavbar';
import MyFooter from '../../components/MyFooter';

export default function ChapterPage() {
  const router = useRouter();
  const { id } = router.query;
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    if (id) {
      fetch(`/api/chapters/${id}`)
        .then(res => res.json())
        .then(data => {
          setChapter(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching chapter:', err);
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading chapter...</p>
        </div>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <MyNavbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Chapter Not Found</h1>
            <p className="text-gray-600 mb-8">The chapter you're looking for doesn't exist.</p>
            <button 
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gray-600 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      <MyNavbar />
      
      {/* Header */}
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 
                       font-medium mb-8 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Chapters
            </button>
            
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {chapter.title}
              </h1>
              
              <div className="flex items-center space-x-6 text-gray-600 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(chapter.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>{Math.ceil(chapter.content.join(' ').split(' ').length / 200)} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chapter Content */}
      <div className="container mx-auto px-6 pb-16 flex-grow">
        <article className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 md:p-12">
            <div className="reading-content">
              {chapter.content.map((paragraph, index) => (
                <p key={index} className={`mb-6 ${index === 0 ? 'first-paragraph' : ''}`}>
                  {paragraph}
                </p>
              ))}
            </div>
            
            {/* Chapter end */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <div className="inline-flex items-center space-x-2 text-gray-400">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="mt-8 text-center">
            <button 
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white 
                       font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              More Chapters
            </button>
          </div>
        </article>
      </div>
     <MyFooter />
    </div>
    );
}         