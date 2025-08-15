const express = require('express');
const router = express.Router();
const mapsController = require('../controllers/mapsController');
const mapsMiddleware = require('../middlewares/mapsMiddleware');

// Geocoding: Convert address to coordinates
router.get('/geocode', mapsMiddleware.validateGeocode, mapsController.geocode);

// Directions: Calculate route from origin to destination
router.get('/directions', mapsMiddleware.validateDirections, mapsController.directions);

// Nearby Places: Find amenities near a location
router.get('/nearby', mapsMiddleware.validateNearby, mapsController.nearbyPlaces);

module.exports = router;