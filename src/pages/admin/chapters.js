import React, { useState, useEffect } from 'react';
import MyNavbar from '../../components/MyNavbar';
import Link from 'next/link';

export default function AdminChapters() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [chapters, setChapters] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if admin is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchChapters(token);
    } else {
      setMessage('Please log in to manage chapters.');
    }
  }, []);

  // Fetch all chapters
  const fetchChapters = async (token) => {
    try {
      const res = await fetch('http://localhost:5000/api/chapters', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setChapters(data);
      } else {
        setMessage(data.message || 'Failed to fetch chapters');
      }
    } catch (error) {
      setMessage('Error: Could not connect to server');
    }
  };

  // Handle chapter submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please log in to add chapters.');
      return;
    }

    const paragraphs = content.split('\n').filter(p => p.trim() !== '');
    try {
      const res = await fetch('http://localhost:5000/api/chapters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content: paragraphs })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Chapter added successfully!');
        setTitle('');
        setContent('');
        fetchChapters(token); // Refresh chapter list
      } else {
        setMessage(data.message || 'Failed to add chapter');
      }
    } catch (error) {
      setMessage('Error: Could not connect to server');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <MyNavbar />
        <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Access Denied</h2>
            <p className="text-center text-red-500">{message}</p>
            <Link href="/admin/login">
              <p className="block text-center text-amber-500 hover:text-amber-600 font-medium mt-4">Go to Login</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <MyNavbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Manage Chapters</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Add New Chapter</h3>
          <div onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Chapter Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Content (separate paragraphs with new lines)</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                rows="6"
                required
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-amber-500 text-white p-2 rounded-lg hover:bg-amber-600 transition"
            >
              Add Chapter
            </button>
            {message && <p className="text-center text-red-500">{message}</p>}
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Existing Chapters</h3>
          {chapters.length === 0 ? (
            <p className="text-center text-gray-600">No chapters found.</p>
          ) : (
            chapters.map(chapter => (
              <div key={chapter._id} className="bg-white p-4 rounded-lg shadow-lg">
                <h4 className="text-lg font-semibold text-gray-900">{chapter.title}</h4>
                <p className="text-gray-600">Created: {new Date(chapter.createdAt).toLocaleDateString()}</p>
                <Link href={`/chapters/${chapter._id}`}>
                  <p className="text-amber-500 hover:text-amber-600 font-medium">View Chapter</p>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}