const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  getProfile,
  updateProfile,
  addFavorite,
  getFavorites
} = require('../controllers/userController');

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.post('/favorites', auth, addFavorite);
router.get('/favorites', auth, getFavorites);

module.exports = router;
