const validateGeocode = (req, res, next) => {
  const { address } = req.query;
  if (!address || typeof address !== 'string' || address.trim() === '') {
    return res.status(400).json({ error: 'Valid address is required' });
  }
  next();
};

const validateDirections = (req, res, next) => {
  const { origin, destination, mode } = req.query;
  if (!origin || !destination || typeof origin !== 'string' || typeof destination !== 'string') {
    return res.status(400).json({ error: 'Valid origin and destination are required' });
  }
  if (mode && !['driving', 'walking', 'bicycling', 'transit'].includes(mode)) {
    return res.status(400).json({ error: 'Invalid travel mode' });
  }
  next();
};

const validateNearby = (req, res, next) => {
  const { lat, lng, type } = req.query;
  if (!lat || !lng || isNaN(parseFloat(lat)) || isNaN(parseFloat(lng))) {
    return res.status(400).json({ error: 'Valid latitude and longitude are required' });
  }
  if (!type || typeof type !== 'string') {
    return res.status(400).json({ error: 'Valid place type is required' });
  }
  next();
};

module.exports = { validateGeocode, validateDirections, validateNearby };