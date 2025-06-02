import React, { useState } from 'react';
import MyNavbar from '../../components/MyNavbar';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setMessage('Login successful! You can now manage chapters.');
        // Redirect to admin chapters page
        window.location.href = '/admin/chapters';
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setMessage('Error: Could not connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <MyNavbar />
      <div className="container mx-auto px-6 py-16 flex-grow flex items-center justify-center">
        <div className="card w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Admin Login</h2>
          <div className="w-16 h-px bg-gray-300 mb-6 mx-auto"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8 text-center">
            Sign in to manage QUADRA chapters.
          </p>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200"
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
                  <span>Logging in...</span>
                </div>
              ) : (
                'Login'
              )}
            </button>
            {message && <p className="text-center text-red-500 mt-4">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}