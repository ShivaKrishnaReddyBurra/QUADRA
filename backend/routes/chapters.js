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
// In chapters.js, modify a route like this:
router.get('/', async (req, res) => {
  try {
    const chapters = await Chapter.find().sort({ createdAt: -1 });
    res.json(chapters);
  } catch (error) {
    console.error('Error fetching chapters:', error); // Log the error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single chapter (public)
router.get('/:id', async (req, res) => {
  try {
    const chapter = await Chapter.findOne({ id: Number(req.params.id) }); // Convert to number
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

// Update chapter (admin only)
router.put('/:id', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const chapter = await Chapter.findOneAndUpdate(
      { id: Number(req.params.id) }, // Convert to number
      { title, content },
      { new: true }
    );
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
    res.json(chapter);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete chapter (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const chapter = await Chapter.findOneAndDelete({ id: Number(req.params.id) }); // Convert to number
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
    res.json({ message: 'Chapter deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;