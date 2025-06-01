const express = require('express');
const router = express.Router();
const Chapter = require('../models/Chapter');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) return res.status(403).json({ message: 'Not an admin' });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get all chapters (public)
router.get('/', async (req, res) => {
  try {
    const chapters = await Chapter.find().sort({ createdAt: -1 });
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single chapter (public)
router.get('/:id', async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
    res.json(chapter);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create chapter (admin only)
router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const chapter = new Chapter({ title, content });
    await chapter.save();
    res.status(201).json(chapter);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;