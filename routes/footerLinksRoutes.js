const express = require("express");
const router = express.Router();
const FooterLinks = require("../models/footerLinks");

// READ all
router.get("/", async (req, res) => {
  try {
    const links = await FooterLinks.find();
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch footer links" });
  }
});

// CREATE new
router.post("/", async (req, res) => {
  try {
    const link = new FooterLinks(req.body);
    await link.save();
    res.status(201).json(link);
  } catch (err) {
    res.status(400).json({ error: "Failed to create footer link" });
  }
});

// UPDATE existing
router.put("/:id", async (req, res) => {
  try {
    const link = await FooterLinks.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!link) return res.status(404).json({ error: "Link not found" });
    res.json(link);
  } catch (err) {
    res.status(400).json({ error: "Failed to update footer link" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await FooterLinks.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Link not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete footer link" });
  }
});

module.exports = router;
