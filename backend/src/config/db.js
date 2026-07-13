const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const DEV_PORT = 27018;
const DEV_DB_PATH = path.join(__dirname, '../../.mongo-dev-data');
const devUri = () => `mongodb://127.0.0.1:${DEV_PORT}/octazen_db`;

let memoryServer;

const startMemoryServer = async () => {
  fs.mkdirSync(DEV_DB_PATH, { recursive: true });
  const { MongoMemoryServer } = require('mongodb-memory-server');
  memoryServer = await MongoMemoryServer.create({
    instance: {
      dbName: 'octazen_db',
      dbPath: DEV_DB_PATH,
      port: DEV_PORT,
      storageEngine: 'wiredTiger',
      launchTimeout: 120000,
    },
  });
  console.log(`📦 Started embedded dev MongoDB on port ${DEV_PORT}`);
  return memoryServer.getUri();
};

const mongooseOptions = {
  serverSelectionTimeoutMS: 3000,
};

const connectDevDB = async () => {
  try {
    const conn = await mongoose.connect(devUri(), mongooseOptions);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return;
  } catch (err) {
    if (!`${err.message}`.includes('ECONNREFUSED') && err.name !== 'MongooseServerSelectionError') throw err;
  }

  console.log('📦 Starting embedded dev MongoDB (first run may take a moment)...');
  const uri = await startMemoryServer();
  const conn = await mongoose.connect(uri, mongooseOptions);
  console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
};

const ensureDevAdmin = async () => {
  if (process.env.NODE_ENV !== 'development') return;
  const User = require('../models/User');
  const ensureDevProjects = require('./ensureDevProjects');
  const email = process.env.ADMIN_EMAIL || 'admin@octazentechnologies.com';
  const exists = await User.findOne({ email });
  if (!exists) {
    await User.create({
      name: 'Octazen Admin',
      email,
      password: process.env.ADMIN_PASSWORD || 'Admin@Octazen2024!',
      role: 'admin',
    });
    console.log(`👤 Dev admin created (${email}) — run "npm run seed" for sample content`);
  }
  await ensureDevProjects();
};

const ensureStartupData = async () => {
  const ensureMenuSettings = require('./ensureMenuSettings');
  const ensureProdAdmin = require('./ensureProdAdmin');
  await ensureMenuSettings();
  await ensureProdAdmin();
  await ensureDevAdmin();
};

const isDefaultLocalUri = (uri) =>
  /localhost:270(17|18)|127\.0\.0\.1:270(17|18)|::1:270(17|18)/.test(uri || '');

const connectDB = async () => {
  if (process.env.NODE_ENV === 'development') {
    const uri = process.env.MONGODB_URI || '';
    if (!isDefaultLocalUri(uri) && process.env.USE_MEMORY_DB !== 'true') {
      try {
        const conn = await mongoose.connect(uri, mongooseOptions);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        await ensureStartupData();
        return;
      } catch (error) {
        console.warn(`⚠️  ${error.message} — using embedded dev MongoDB`);
      }
    }
    await connectDevDB();
    await ensureStartupData();
    return;
  }

  const conn = await mongoose.connect(process.env.MONGODB_URI, mongooseOptions);
  console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  await ensureStartupData();
};

module.exports = connectDB;
