import express from 'express';
import upload from '../utils/multer.js'; // ✅ corrected path

const router = express.Router();

// POST route for uploading an image to Cloudinary
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    res.json({
      success: true,
      imageUrl: req.file.path, // Cloudinary hosted image URL
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: 'Image upload failed' });
  }
});

export default router;
