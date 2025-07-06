const express = require('express');
const router = express.Router();
const { sendPromotionalMail } = require('../controllers/mailerController');

router.post('/promotion-opt-in', sendPromotionalMail);

module.exports = router;
