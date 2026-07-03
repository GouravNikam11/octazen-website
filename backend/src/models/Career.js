const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, default: 'Kolhapur, Maharashtra, India' },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'remote'],
    required: true,
  },
  experience: { type: String },
  description: { type: String, required: true },
  responsibilities: [{ type: String }],
  requirements: [{ type: String }],
  niceToHave: [{ type: String }],
  salary: { type: String },
  isActive: { type: Boolean, default: true },
  deadline: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Career', CareerSchema);
