const multer = require('multer');
const path = require('path');

// Allowed file types
const FILE_TYPES = /jpeg|jpg|png|webp/;

// Memory storage (safe for Vercel or other serverless hosts)
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (req, file, cb) => {
  const isValidType =
    FILE_TYPES.test(file.mimetype) &&
    FILE_TYPES.test(path.extname(file.originalname).toLowerCase());
  if (isValidType) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, JPG, PNG, or WEBP files allowed!'), false);
  }
};

// Configure multer with limits
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB
  }
});

// Predefined fields config (for docs & property uploads)
const propertyFields = upload.fields([
  { name: 'identityProof', maxCount: 1 },
  { name: 'ownershipProof', maxCount: 1 },
  { name: 'floorPlan', maxCount: 1 },
  { name: 'propertyPhotos', maxCount: 10 }
]);

// Export both: main instance + helper configs
module.exports = {
  upload,           // use upload.array() / upload.single()
  propertyFields    // ready-to-use predefined fields
};