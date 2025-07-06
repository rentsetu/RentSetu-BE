const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { createProperty, getAllProperties } = require('../controllers/propertyController');
const upload = require('../middlewares/upload');

router.post('/create',auth,upload.array('images', 5),createProperty);
router.get('/all', getAllProperties);

module.exports = router;
