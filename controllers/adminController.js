const User = require('../models/User');
const Property = require('../models/Property');

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json(users);
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  await User.findByIdAndDelete(userId);
  res.status(200).json({ message: 'User deleted' });
};

exports.getAllProperties = async (req, res) => {
  const properties = await Property.find().populate('listedBy', 'name email');
  res.status(200).json(properties);
};

exports.deleteProperty = async (req, res) => {
  const { propertyId } = req.params;
  await Property.findByIdAndDelete(propertyId);
  res.status(200).json({ message: 'Property deleted' });
};
