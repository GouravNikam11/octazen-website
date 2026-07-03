const mongoose = require('mongoose');

const TechnologySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'mobile', 'database', 'cloud', 'devops', 'tools', 'ai'],
    required: true,
  },
  icon: { type: String },
  proficiency: { type: Number, min: 1, max: 100, default: 85 },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Technology', TechnologySchema);
