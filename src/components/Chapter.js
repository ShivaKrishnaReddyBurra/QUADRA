import React, { useState } from 'react';
import Link from 'next/link';

const Chapter = ({ chapter }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left group"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
              {chapter.title}
            </h3>
            <div className={`flex items-center justify-center w-6 h-6 rounded-full 
                           bg-gray-100 text-gray-600 transform transition-all duration-200 
                           ${open ? 'rotate-180' : 'rotate-0'}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </button>
        
        <div className={`mt-4 overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="space-y-4">
            <div className="h-px bg-gray-200"></div>
            <div className="text-gray-700 leading-relaxed space-y-3">
              {chapter.content.slice(0, 2).map((paragraph, index) => (
                <p key={index} className="text-sm">{paragraph}</p>
              ))}
              {chapter.content.length > 2 && (
                <p className="text-gray-500 italic text-sm">...</p>
              )}
            </div>
            <Link href={`/chapters/${chapter.id}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium 
                             text-white bg-gray-900 rounded-lg hover:bg-gray-800 
                             transition-colors duration-200 cursor-pointer">
                Read Full Chapter
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapter;