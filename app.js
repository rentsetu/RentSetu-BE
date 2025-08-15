const express = require('express');
const cors = require('cors');
const rateLimiter = require('./middlewares/rateLimiter');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const mailerRoutes = require('./routes/mailerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const mapsRoutes = require('./routes/mapsRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/property', propertyRoutes);
app.use('/api/mailer', mailerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/maps', mapsRoutes);

app.get('/', (req, res) => res.send('RentSetu API is Live ✅'));
module.exports = app;