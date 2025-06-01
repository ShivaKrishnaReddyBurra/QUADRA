import React, { useState } from 'react';
import MyNavbar from '../../components/MyNavbar';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
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
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MyNavbar />
      <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Admin Login</h2>
          <div onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-amber-500 text-white p-2 rounded-lg hover:bg-amber-600 transition"
            >
              Login
            </button>
            {message && <p className="text-center text-red-500">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}