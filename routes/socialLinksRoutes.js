const express = require("express");
const router = express.Router();
const SocialLinks = require("../models/socialLinks");

// CREATE
router.post("/", async (req, res) => {
  try {
    const link = new SocialLinks(req.body); // { type, url }
    await link.save();
    res.json(link);
  } catch (err) {
    res.status(400).json({ error: "Failed to create social link" });
  }
});

// READ all
router.get("/", async (req, res) => {
  try {
    const links = await SocialLinks.find();
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch social links" });
  }
});

// UPDATE by ID
router.put("/:id", async (req, res) => {
  try {
    const link = await SocialLinks.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(link);
  } catch (err) {
    res.status(400).json({ error: "Failed to update social link" });
  }
});

// DELETE by ID
router.delete("/:id", async (req, res) => {
  try {
    await SocialLinks.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete social link" });
  }
});

module.exports = router;
