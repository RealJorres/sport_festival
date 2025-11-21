import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './src/routes/index.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/', routes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'STRASUC Sports Management System API',
    version: '1.0.0',
    endpoints: {
      users: '/api/v1/users',
      universities: '/api/v1/universities',
      sports: '/api/v1/sports',
      teams: '/api/v1/teams',
      schedules: '/api/v1/schedules',
      participants: '/api/v1/participants',
      scores: '/api/v1/scores',
      medals: '/api/v1/medals'
    }
  });
});

// 404 handler for undefined routes - FIXED VERSION
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    message: `The requested endpoint ${req.method} ${req.originalUrl} does not exist`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Base URL: http://localhost:${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/`);
});