const mongoose = require('mongoose');
const slugify = require('slugify');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true },
  shortDescription: { type: String, required: true },
  description: { type: String, default: '' },
  client: { type: String },
  category: {
    type: String,
    enum: ['mobile', 'web', 'fullstack', 'api', 'enterprise', 'ai'],
    required: true,
  },
  technologies: [{ type: String }],
  features: [{ type: String }],
  platform: [{ type: String }],
  images: [{ type: String }],
  thumbnail: { type: String },
  liveUrl: { type: String },
  githubUrl: { type: String },
  isFeatured: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
  completedDate: { type: Date },
  order: { type: Number, default: 0 },
}, { timestamps: true });

ProjectSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (!this.description && this.shortDescription) {
    this.description = this.shortDescription;
  }
  if (this.isPublished === undefined || this.isPublished === null) {
    this.isPublished = true;
  }
  next();
});

module.exports = mongoose.model('Project', ProjectSchema);
