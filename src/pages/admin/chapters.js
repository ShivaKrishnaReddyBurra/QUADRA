import React, { useState, useEffect } from 'react';
import MyNavbar from '../../components/MyNavbar';
import Link from 'next/link';

export default function AdminChapters() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [chapters, setChapters] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editingChapter, setEditingChapter] = useState(null); // State for editing chapter
  const [loading, setLoading] = useState(false); // Loading state for actions

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
    setLoading(true);
    try {
      const res = await fetch('/api/chapters', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      console.log('Fetched chapters:', data); // Log fetched chapters
      if (res.ok) {
        setChapters(data);
      } else {
        setMessage(data.message || 'Failed to fetch chapters');
      }
    } catch (error) {
      setMessage('Error: Could not connect to server');
    } finally {
      setLoading(false);
    }
  };

  // Handle chapter submission (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please log in to add chapters.');
      return;
    }

    const paragraphs = content.split('\n').filter(p => p.trim() !== '');
    setLoading(true);
    try {
      const url = editingChapter 
        ? `/api/chapters/${editingChapter.id}`
        : '/api/chapters';
      const method = editingChapter ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content: paragraphs })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(editingChapter ? 'Chapter updated successfully!' : 'Chapter added successfully!');
        setTitle('');
        setContent('');
        setEditingChapter(null);
        fetchChapters(token); // Refresh chapter list
      } else {
        setMessage(data.message || `Failed to ${editingChapter ? 'update' : 'add'} chapter`);
      }
    } catch (error) {
      setMessage('Error: Could not connect to server');
    } finally {
      setLoading(false);
    }
  };

  // Handle edit chapter
  const handleEdit = (chapter) => {
    setEditingChapter(chapter);
    setTitle(chapter.title);
    setContent(chapter.content.join('\n'));
  };

  // Handle delete chapter
  const handleDelete = async (chapterId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please log in to delete chapters.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/chapters/${chapterId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Chapter deleted successfully!');
        fetchChapters(token); // Refresh chapter list
      } else {
        setMessage(data.message || 'Failed to delete chapter');
      }
    } catch (error) {
      setMessage('Error: Could not connect to server');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <MyNavbar />
        <div className="container mx-auto px-6 py-16 flex-grow flex items-center justify-center">
          <div className="card w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Access Denied</h2>
            <p className="text-center text-red-500 mb-6">{message}</p>
            <Link href="/admin/login">
              <p className="block text-center text-amber-500 hover:text-amber-600 font-medium transition-all duration-200">
                Go to Login
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <MyNavbar />
      <div className="container mx-auto px-6 py-16 flex-grow">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Manage Chapters</h2>
        <div className="w-16 h-px bg-gray-300 mb-6 mx-auto"></div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
          Add, edit, or delete chapters for the QUADRA story collection.
        </p>
        
        <div className="card mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Add New Chapter</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Chapter Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Content (separate paragraphs with new lines)</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200"
                rows="6"
                required
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="spinner mr-2"></div>
                  <span>{editingChapter ? 'Updating...' : 'Adding...'}</span>
                </div>
              ) : (
                editingChapter ? 'Update Chapter' : 'Add Chapter'
              )}
            </button>
            {message && <p className="text-center text-red-500 mt-4">{message}</p>}
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Existing Chapters</h3>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="spinner"></div>
            </div>
          ) : chapters.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">No chapters found.</p>
          ) : (
            chapters.map(chapter => (
              <div key={chapter._id} className="card">
                <h4 className="text-xl font-semibold text-gray-900">{chapter.title}</h4>
                <p className="text-gray-600">Created: {new Date(chapter.createdAt).toLocaleDateString()}</p>
                <div className="flex space-x-4 mt-4">
                  <Link href={`/chapters/${chapter.id}`} prefetch={false}>
                    <p className="text-amber-500 hover:text-amber-600 font-medium transition-all duration-200">
                      View Chapter
                    </p>
                  </Link>
                  <button
                    onClick={() => handleEdit(chapter)}
                    className="text-amber-500 hover:text-amber-600 font-medium transition-all duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(chapter.id)}
                    className="text-red-500 hover:text-red-600 font-medium transition-all duration-200"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
