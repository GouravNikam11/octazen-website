require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler');
const { generalLimiter } = require('./src/middleware/rateLimit');

const app = express();

// Connect Database
connectDB();

// Security Middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

// Rate limiting (disabled in development)
app.use('/api/', generalLimiter);

// CORS
app.use(cors({
  origin: [process.env.CLIENT_URL || 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));

// Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Static Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/projects', require('./src/routes/projects'));
app.use('/api/services', require('./src/routes/services'));
app.use('/api/technologies', require('./src/routes/technologies'));
app.use('/api/testimonials', require('./src/routes/testimonials'));
app.use('/api/team', require('./src/routes/team'));
app.use('/api/blog', require('./src/routes/blog'));
app.use('/api/careers', require('./src/routes/careers'));
app.use('/api/contact', require('./src/routes/contact'));
app.use('/api/settings', require('./src/routes/settings'));
app.use('/api/industries', require('./src/routes/industries'));
app.use('/api/upload', require('./src/routes/upload'));
app.use('/api/stats', require('./src/routes/stats'));

// Health Check
app.get('/api/health', (req, res) => res.json({ status: 'OK', env: process.env.NODE_ENV }));

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT} [${process.env.NODE_ENV}]`));
