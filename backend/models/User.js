const mongoose = require('mongoose');
const Counter = require('./Counter'); // Import the Counter model

const userSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: true }
});

// Pre-save hook to set the user ID
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
  

module.exports = mongoose.model('User', userSchema);