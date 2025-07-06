const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  wantsPromotions: { type: Boolean, default: false },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
  role: {
  type: String,
  enum: ['user', 'admin'],
  default: 'user'
}

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
