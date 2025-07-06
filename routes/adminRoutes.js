const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const {
  getAllUsers,
  deleteUser,
  getAllProperties,
  deleteProperty
} = require('../controllers/adminController');

router.use(auth, isAdmin);

router.get('/users', getAllUsers);
router.delete('/users/:userId', deleteUser);

router.get('/properties', getAllProperties);
router.delete('/properties/:propertyId', deleteProperty);

module.exports = router;
