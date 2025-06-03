const mongoose = require('mongoose');
const path = require('path');
const Counter = require(path.join(__dirname, 'Counter')); // Corrected path

const userSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: true }
});

userSchema.pre('save', async function(next) {
  if (!this.id) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { name: 'userId' },
        { $inc: { sequence: 1 } },
        { new: true, upsert: true }
      );
      if (!counter) return next(new Error("Failed to generate user ID."));
      this.id = counter.sequence;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const User = mongoose.model('User', userSchema);
console.log('User model registered:', mongoose.models.User ? 'Yes' : 'No');
module.exports = User;