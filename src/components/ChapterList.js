import React from 'react';
import Chapter from './Chapter';

const ChapterList = ({ chapters }) => {
  return (
    <div className="list-group">
      {chapters.map(chapter => (
        <Chapter key={chapter.id} chapter={chapter} />
      ))}
    </div>
  );
};

export default ChapterList;
