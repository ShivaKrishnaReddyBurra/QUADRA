import React from 'react';
import Chapter from './Chapter';

const ChapterList = ({ chapters }) => {
  return (
    <div className="space-y-4">
      {chapters.map(chapter => (
        <Chapter key={chapter._id} chapter={chapter} />
      ))}
    </div>
  );
};

export default ChapterList;