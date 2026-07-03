require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const connectDB = require('./db');
const ensureDevProjects = require('./ensureDevProjects');

(async () => {
  await connectDB();
  await ensureDevProjects();
  console.log('✅ Portfolio projects synced');
  process.exit(0);
})().catch(err => {
  console.error(err);
  process.exit(1);
});
