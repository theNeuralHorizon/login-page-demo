const mongoose = require('../db');

const userSchema = new mongoose.Schema({
  sub: { type: String, unique: true, required: true }, // Cognito sub
  email: { type: String, required: true },
  name: String,
  createdAt: { type: Date, default: Date.now },
  // Add more fields as needed
});

module.exports = mongoose.model('User', userSchema);
