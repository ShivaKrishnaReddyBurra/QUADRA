const mongoose = require('mongoose');
const path = require('path');
const Counter = require(path.join(__dirname, 'Counter')); // Corrected path

const chapterSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  title: { type: String, required: true },
  content: [{ type: String }], // Array of paragraphs
  createdAt: { type: Date, default: Date.now }
});

chapterSchema.pre('save', async function(next) {
  if (!this.id) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { name: 'chapterId' },
        { $inc: { sequence: 1 } },
        { new: true, upsert: true }
      );
      this.id = counter.sequence;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const Chapter = mongoose.model('Chapter', chapterSchema);
console.log('Chapter model registered:', mongoose.models.Chapter ? 'Yes' : 'No');
module.exports = Chapter;