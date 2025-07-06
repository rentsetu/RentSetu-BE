const User = require('../models/User');
const Property = require('../models/Property');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, wantsPromotions } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { name, wantsPromotions },
      { new: true }
    ).select('-password');
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const { propertyId } = req.body;
    const user = await User.findById(req.user.id);
    if (!user.favorites.includes(propertyId)) {
      user.favorites.push(propertyId);
      await user.save();
    }
    res.status(200).json({ message: 'Added to favorites' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add favorite' });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    res.status(200).json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get favorites' });
  }
};
