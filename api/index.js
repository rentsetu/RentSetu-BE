const express = require('express');
const cors = require('cors');
const rateLimiter = require('../middlewares/rateLimiter');
require('dotenv').config();

const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');
const propertyRoutes = require('../routes/propertyRoutes');
const mailerRoutes = require('../routes/mailerRoutes');
const adminRoutes = require('../routes/adminRoutes');
const mapsRoutes = require('../routes/mapsRoutes');

const index = express();
index.use(cors());
index.use(express.json());
index.use(rateLimiter);

// Routes
index.use('/api/auth', authRoutes);
index.use('/api/user', userRoutes);
index.use('/api/property', propertyRoutes);
index.use('/api/mailer', mailerRoutes);
index.use('/api/admin', adminRoutes);
index.use('/api/maps', mapsRoutes);

index.get('/', (req, res) => res.send('RentSetu API is Live ✅'));
module.exports = index;