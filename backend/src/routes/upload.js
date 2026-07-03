const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

router.post('/:folder', protect, (req, res, next) => {
  const allowed = ['projects', 'team', 'blog', 'misc'];
  if (!allowed.includes(req.params.folder)) {
    return res.status(400).json({ success: false, message: 'Invalid folder' });
  }
  ensureDir(path.join(__dirname, `../../uploads/${req.params.folder}`));
  next();
}, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
  const url = `/uploads/${req.params.folder}/${req.file.filename}`;
  res.json({ success: true, url, filename: req.file.filename });
});

router.delete('/:folder/:filename', protect, (req, res) => {
  const filePath = path.join(__dirname, `../../uploads/${req.params.folder}/${req.params.filename}`);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  res.json({ success: true, message: 'File deleted' });
});

module.exports = router;
