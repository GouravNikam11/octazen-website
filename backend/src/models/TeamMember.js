const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  bio: { type: String },
  avatar: { type: String },
  skills: [{ type: String }],
  social: {
    linkedin: { type: String },
    github: { type: String },
    twitter: { type: String },
  },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', TeamMemberSchema);
