const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const chapterRoutes = require('./routes/chapters');
const next = require('next');
const path = require('path');

dotenv.config();
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(cors());
  server.use(express.json());

  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

  server.use('/api/test', (req, res) => {
    res.json({ message: 'API is working' });
  });

  server.use('/api/auth', authRoutes);
  server.use('/api/chapters', chapterRoutes);
  server.use(express.static(path.join(__dirname, 'public')));

  server.get('/', (req, res) => {
    console.log('Handling route:', req.path);
    return handle(req, res);
  });
  server.get('/chapters/:id', (req, res) => {
    return handle(req, res);
  });
  server.get('/admin/login', (req, res) => {
    return handle(req, res);
  });
  server.get('/admin/chapters', (req, res) => {
    return handle(req, res);
  });
  // Explicitly serve Next.js static files
  server.use('/_next/static', express.static(path.join(__dirname, '.next/static')));
  // Fallback for other Next.js routes
  // server.get('*', (req, res) => {
  //   console.log('Handling fallback route for:', req.path);
  //   return handle(req, res);
  // });

  const PORT = process.env.PORT || 3000;
  console.log('Starting server on port', PORT);
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Error starting server:', err);
  process.exit(1);
});