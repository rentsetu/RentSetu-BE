const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  listedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  propertyAddress: String,
  city: String,
  zipCode: String,
  pincode: String,
  directionFacing: String,
  floorRentedOut: String,

  propertyType: { type: String, enum: ['Apartment', 'Bungalow', 'Independent House', 'Villa', 'Other'] },
  numberOfBedrooms: String,
  numberOfBathrooms: String,
  squareFootage: String,
  numberOfFloors: String,
  furnishingStatus: { type: String, enum: ['Fully Furnished', 'Semi Furnished', 'Unfurnished'] },

  yearOfConstruction: String,
  renovated: { type: String },
  specialFeatures: String,

  parkingAvailable: Boolean,
  parkingType: String,
  amenities: String,

  expectedRent: Number,
  securityDeposit: Number,
  leaseTerm: String,
  availableFrom: Date,

  preferredTenantType: String,
  petsAllowed: Boolean,
  smokingAllowed: Boolean,
  restrictions: String,

  utilitiesIncluded: String,
  maintenanceBy: String,
  rentCollectionFrequency: String,
  rentPaymentMethod: String,

  identityProof: String,
  ownershipProof: String,
  floorPlan: String,
  propertyPhotos: [String],

  consentCheck: Boolean,
  marketingSource: String,
  workingWithAgents: Boolean,
  additionalNotes: String,
  signature: String,

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema);
