require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const run = async () => {
  const email = process.env.ADMIN_EMAIL || 'admin@octazentechnologies.com';
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    console.error('❌ Set ADMIN_PASSWORD in the environment before running create-admin.');
    process.exit(1);
  }

  if (!process.env.MONGODB_URI) {
    console.error('❌ Set MONGODB_URI in the environment before running create-admin.');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  const existing = await User.findOne({ email });

  if (existing) {
    existing.password = password;
    await existing.save();
    console.log(`✅ Admin password updated for ${email}`);
  } else {
    await User.create({
      name: 'Octazen Admin',
      email,
      password,
      role: 'admin',
    });
    console.log(`✅ Admin user created for ${email}`);
  }

  await mongoose.disconnect();
  process.exit(0);
};

run().catch(err => {
  console.error('❌ Failed to create admin:', err.message);
  process.exit(1);
});
