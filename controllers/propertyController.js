const Property = require('../models/Property');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');
const nodemailer = require('nodemailer');
const User = require('../models/User');

exports.createProperty = async (req, res) => {
  try {
    const body = req.body;
    const files = req.files;
    const uploads = {};

    // Upload documents to Cloudinary
    for (let key of ['identityProof', 'ownershipProof', 'floorPlan']) {
      if (files[key]) {
        const result = await cloudinary.uploader.upload(files[key][0].path, {
          folder: `rentsetu/${key}`
        });
        uploads[key] = result.secure_url;
        fs.unlinkSync(files[key][0].path);
      }
    }

    // Upload multiple property photos
    const photoLinks = [];
    if (files.propertyPhotos) {
      for (let file of files.propertyPhotos) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'rentsetu/propertyPhotos'
        });
        photoLinks.push(result.secure_url);
        fs.unlinkSync(file.path);
      }
    }

    // Create property document
    const property = new Property({
      listedBy: req.user.id,
      propertyAddress: body.propertyAddress,
      city: body.city,
      zipCode: body.zipCode,
      pincode: body.pincode,
      directionFacing: body.directionFacing,
      floorRentedOut: body.floorRentedOut,
      propertyType: body.propertyType,
      numberOfBedrooms: body.numberOfBedrooms,
      numberOfBathrooms: body.numberOfBathrooms,
      squareFootage: body.squareFootage,
      numberOfFloors: body.numberOfFloors,
      furnishingStatus: body.furnishingStatus,
      yearOfConstruction: body.yearOfConstruction,
      renovated: body.renovated,
      specialFeatures: body.specialFeatures,
      parkingAvailable: body.parkingAvailable === 'true',
      parkingType: body.parkingType,
      amenities: body.amenities,
      expectedRent: body.expectedRent,
      securityDeposit: body.securityDeposit,
      leaseTerm: body.leaseTerm,
      availableFrom: body.availableFrom,
      preferredTenantType: body.preferredTenantType,
      petsAllowed: body.petsAllowed === 'true',
      smokingAllowed: body.smokingAllowed === 'true',
      restrictions: body.restrictions,
      utilitiesIncluded: body.utilitiesIncluded,
      maintenanceBy: body.maintenanceBy,
      rentCollectionFrequency: body.rentCollectionFrequency,
      rentPaymentMethod: body.rentPaymentMethod,
      identityProof: uploads.identityProof || null,
      ownershipProof: uploads.ownershipProof || null,
      floorPlan: uploads.floorPlan || null,
      propertyPhotos: photoLinks,
      consentCheck: body.consentCheck === 'true',
      marketingSource: body.marketingSource,
      workingWithAgents: body.workingWithAgents === 'true',
      additionalNotes: body.additionalNotes,
      signature: body.signature
    });

    await property.save();

    // Emailing
    const user = await User.findById(req.user.id);
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    // Admin notification
    await transporter.sendMail({
      from: `"RentSetu Bot" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      subject: '📢 New Property Listing Submitted!',
      html: `
        <h3>New Property Listed</h3>
        <p><strong>User:</strong> ${user.name} (${user.email})</p>
        <p><strong>Property:</strong> ${body.propertyAddress}</p>
        <p><strong>Rent:</strong> ₹${body.expectedRent}</p>
        <p><strong>City:</strong> ${body.city}</p>
        <p><strong>Tenant Type:</strong> ${body.preferredTenantType}</p>
      `
    });

    // Notify user if opted
    if (user.wantsPromotions) {
      await transporter.sendMail({
        from: `"RentSetu" <${process.env.EMAIL}>`,
        to: user.email,
        subject: 'Thanks for Listing Your Property!',
        html: `
          <h3>Hi ${user.name},</h3>
          <p>Your property at "<strong>${body.propertyAddress}</strong>" has been listed successfully.</p>
          <p>We’ll notify you of any interest!</p>
        `
      });
    }

    res.status(201).json({ message: 'Property listed successfully', property });

  } catch (err) {
    console.error('❌ Listing Error:', err);
    res.status(500).json({ error: 'Failed to upload property' });
  }
};
