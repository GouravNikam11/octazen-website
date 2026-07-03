require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const connectDB = require('./db');
const Stat = require('../models/Stat');

const DB_STATS = [
  { label: 'Years of Experience', value: 2, suffix: '+', icon: 'calendar', order: 1 },
  { label: 'Projects Delivered', value: 10, suffix: '+', icon: 'check-circle', order: 2 },
  { label: 'Happy Clients', value: 7, suffix: '+', icon: 'users', order: 3 },
];

async function updateStats() {
  await connectDB();

  await Stat.deleteOne({ label: 'Technologies Mastered' });

  for (const stat of DB_STATS) {
    await Stat.findOneAndUpdate(
      { label: stat.label },
      { ...stat, isActive: true },
      { upsert: true, new: true }
    );
    console.log(`✅ ${stat.label}: ${stat.value}${stat.suffix}`);
  }

  console.log('ℹ️  Technologies Mastered stays fixed at 25+ in the frontend (not in DB)');
  process.exit(0);
}

updateStats().catch(err => {
  console.error(err);
  process.exit(1);
});
