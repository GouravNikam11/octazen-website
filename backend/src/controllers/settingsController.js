const Settings = require('../models/Settings');

exports.getPublic = async (req, res) => {
  try {
    const settings = await Settings.find({ group: { $in: ['general', 'seo', 'social', 'contact', 'hero', 'menu'] } });
    const result = {};
    settings.forEach(s => { result[s.key] = s.value; });
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const settings = await Settings.find();
    const result = {};
    settings.forEach(s => { result[s.key] = { value: s.value, group: s.group, label: s.label }; });
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.upsert = async (req, res) => {
  try {
    const updates = req.body; // { key: value, ... }
    const ops = Object.entries(updates).map(([key, value]) => ({
      updateOne: {
        filter: { key },
        update: { $set: { key, value: value.value, group: value.group || 'general', label: value.label || key } },
        upsert: true,
      },
    }));
    await Settings.bulkWrite(ops);
    res.json({ success: true, message: 'Settings updated' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const setting = await Settings.findOneAndUpdate(
      { key: req.params.key },
      { $set: { value: req.body.value } },
      { new: true, upsert: true }
    );
    res.json({ success: true, data: setting });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
