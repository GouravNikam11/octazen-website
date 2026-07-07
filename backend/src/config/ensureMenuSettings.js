const Settings = require('../models/Settings');
const { getDefaultMenuSettings } = require('./menuSettingsData');

const ensureMenuSettings = async () => {
  const defaults = getDefaultMenuSettings();
  let added = 0;

  for (const setting of defaults) {
    const exists = await Settings.findOne({ key: setting.key });
    if (!exists) {
      await Settings.create(setting);
      added += 1;
    }
  }

  if (added > 0) {
    console.log(`📋 Added ${added} menu visibility setting(s)`);
  }
};

module.exports = ensureMenuSettings;
