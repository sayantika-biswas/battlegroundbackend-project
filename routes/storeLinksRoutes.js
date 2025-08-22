const express = require("express");
const router = express.Router();
const StoreLinks = require("../models/storeLinks");

// CREATE
router.post("/", async (req, res) => {
  try {
    const link = new StoreLinks(req.body); // { type, url }
    await link.save();
    res.json(link);
  } catch (err) {
    res.status(400).json({ error: "Failed to create store link" });
  }
});

// READ all
router.get("/", async (req, res) => {
  try {
    const links = await StoreLinks.find();
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch store links" });
  }
});

// UPDATE by ID
router.put("/:id", async (req, res) => {
  try {
    const link = await StoreLinks.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(link);
  } catch (err) {
    res.status(400).json({ error: "Failed to update store link" });
  }
});

// DELETE by ID
router.delete("/:id", async (req, res) => {
  try {
    await StoreLinks.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete store link" });
  }
});

module.exports = router;
