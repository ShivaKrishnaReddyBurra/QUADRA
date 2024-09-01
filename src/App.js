import React, { useEffect, useState } from 'react';
import ChapterList from './components/ChapterList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

function App() {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    fetch('/chapters.json')
      .then(response => response.json())
      .then(data => setChapters(data));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">QUADRA</h1>
      <ChapterList chapters={chapters} />
    </div>
  );
}

export default App;