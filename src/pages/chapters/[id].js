import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MyNavbar from '../../components/MyNavbar';
import MyFooter from '../../components/MyFooter';

export async function getServerSideProps({ params }) {
  const { id } = params;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chapters/${id}`);
    if (!res.ok) {
      return { props: { chapter: null } };
    }
    const chapter = await res.json();
    return { props: { chapter } };
  } catch (err) {
    console.error('Error fetching chapter:', err);
    return { props: { chapter: null } };
  }
}

export default function ChapterPage({ chapter: initialChapter }) {
  const router = useRouter();
  const { id } = router.query;
  const [chapter, setChapter] = useState(initialChapter);
  const [loading, setLoading] = useState(!initialChapter);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    if (!initialChapter && id) {
      setLoading(true);
      fetch(`/api/chapters/${id}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to fetch chapter');
          }
          return res.json();
        })
        .then(data => {
          setChapter(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching chapter:', err);
          setLoading(false);
        });
    }
  }, [id, initialChapter]);

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
          <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading chapter...</p>
        </div>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <MyNavbar />
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Chapter Not Found
            </h1>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              The chapter you&apos;re looking for doesn&apos;t exist.
            </p>
            <button 
              onClick={() => router.push('/')}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm sm:text-base"
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
      
      {/* Main Content with proper spacing */}
      <div className="flex-grow pt-16 sm:pt-20 pb-24 sm:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Back Button */}
            <button 
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 
                       font-medium mb-6 sm:mb-8 transition-colors duration-200 text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Chapters
            </button>
            
            {/* Chapter Header */}
            <div className="mb-8 sm:mb-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                {chapter.title}
              </h1>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-gray-600 text-xs sm:text-sm">
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
                {/* <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>{Math.ceil(chapter.content.join(' ').split(' ').length / 200)} min read</span>
                </div> */}
              </div>
            </div>
            
            {/* Chapter Content */}
            <article className="mb-8 sm:mb-12">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-4 sm:p-6 md:p-8 lg:p-12">
                  <div className="prose prose-gray max-w-none">
                    {chapter.content.map((paragraph, index) => (
                      <p key={index} className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  
                  {/* Chapter end decoration */}
                  <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 text-center">
                    <div className="inline-flex items-center space-x-2 text-gray-400">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            
            {/* Navigation */}
            <div className="text-center">
              <button 
                onClick={() => router.push('/')}
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gray-900 text-white 
                         font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm sm:text-base"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                More Chapters
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <MyFooter />
    </div>
  );
}