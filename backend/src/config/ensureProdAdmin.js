const User = require('../models/User');

const ensureProdAdmin = async () => {
  if (process.env.NODE_ENV !== 'production') return;

  const email = process.env.ADMIN_EMAIL || 'admin@octazentechnologies.com';
  const exists = await User.findOne({ email });
  if (exists) return;

  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    console.warn(`⚠️  No admin user for ${email}. Set ADMIN_PASSWORD on Render and redeploy, or run: npm run create-admin`);
    return;
  }

  await User.create({
    name: 'Octazen Admin',
    email,
    password,
    role: 'admin',
  });
  console.log(`👤 Production admin created (${email})`);
};

module.exports = ensureProdAdmin;
