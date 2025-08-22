const express = require("express");
const router = express.Router();
const { upload, uploadToS3, deleteFromS3 } = require("../config/uploadS3");
const BgImgCarousel = require("../models/bgimgcarousel");

// Get all
router.get("/", async (req, res) => {
  const images = await BgImgCarousel.find();
  res.json(images);
});

// Upload new image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload file to S3
    const imageUrl = await uploadToS3(req.file);

    // Save in DB
    const newImage = new BgImgCarousel({ imageUrl });
    await newImage.save();

    res.json(newImage);
  } catch (err) {
    console.error("Error uploading:", err);
    res.status(500).json({ error: "Failed to upload image" });
  }
});


// Delete
router.delete("/:id", async (req, res) => {
  try {
    const image = await BgImgCarousel.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Extract S3 key from URL (everything after bucket domain)
    const fileKey = image.imageUrl.split(".amazonaws.com/")[1];

    // Delete from S3
    await deleteFromS3(fileKey);

    // Delete from DB
    await BgImgCarousel.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Image deleted from DB & S3" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete image" });
  }
});

module.exports = router;
