const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  sequence: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);
console.log('Counter model registered:', mongoose.models.Counter ? 'Yes' : 'No');
module.exports = Counter;