const { Client } = require('@googlemaps/google-maps-services-js');

const mapsClient = new Client({});

const geocode = async (req, res) => {
  try {
    const { address } = req.query;
    const response = await mapsClient.geocode({
      params: {
        address,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });

    if (response.data.status === 'OK') {
      const { lat, lng } = response.data.results[0].geometry.location;
      return res.json({
        latitude: lat,
        longitude: lng,
        formattedAddress: response.data.results[0].formatted_address,
      });
    }
    return res.status(400).json({ error: `Geocoding failed: ${response.data.status}` });
  } catch (error) {
    console.error('Geocoding error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const directions = async (req, res) => {
  try {
    const { origin, destination, mode } = req.query;
    const response = await mapsClient.directions({
      params: {
        origin,
        destination,
        mode: mode || 'driving', // Default to driving if mode not specified
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
      timeout: 1000,
    });

    if (response.data.status === 'OK') {
      const route = response.data.routes[0];
      const leg = route.legs[0];
      return res.json({
        distance: leg.distance.text,
        duration: leg.duration.text,
        steps: leg.steps.map(step => step.html_instructions),
      });
    }
    return res.status(400).json({ error: `Directions failed: ${response.data.status}` });
  } catch (error) {
    console.error('Directions error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const nearbyPlaces = async (req, res) => {
  try {
    const { lat, lng, type } = req.query;
    const response = await mapsClient.placesNearby({
      params: {
        location: { lat: parseFloat(lat), lng: parseFloat(lng) },
        radius: 5000, // 5km radius
        type,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });

    if (response.data.status === 'OK') {
      return res.json(
        response.data.results.map(place => ({
          name: place.name,
          address: place.vicinity,
          location: place.geometry.location,
        }))
      );
    }
    return res.status(400).json({ error: `Places search failed: ${response.data.status}` });
  } catch (error) {
    console.error('Places error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { geocode, directions, nearbyPlaces };