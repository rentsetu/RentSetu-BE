const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { createProperty, getAllProperties } = require('../controllers/propertyController');
const { propertyFields } = require('../middlewares/upload');

router.post('/create', auth, propertyFields, createProperty);
router.get('/all', getAllProperties);

module.exports = router;