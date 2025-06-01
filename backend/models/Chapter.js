const mongoose = require('mongoose');
const Counter = require('./Counter'); // Import the Counter model

const chapterSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  title: { type: String, required: true },
  content: [{ type: String }], // Array of paragraphs
  createdAt: { type: Date, default: Date.now }
});


chapterSchema.pre('save', async function(next) {
  if (!this.id) {
    const counter = await Counter.findOneAndUpdate(
      { name: 'chapterId' },
      { $inc: { sequence: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.sequence;
  }
  next();
});

module.exports = mongoose.model('Chapter', chapterSchema);