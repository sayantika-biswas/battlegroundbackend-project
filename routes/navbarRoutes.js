const express = require("express");
const router = express.Router();
const NavbarButtons = require("../models/navbarButtons");

// ✅ READ all navbar buttons
router.get("/", async (req, res) => {
  try {
    const buttons = await NavbarButtons.find();
    res.json(buttons);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch navbar buttons" });
  }
});

// ✅ CREATE a new navbar button
router.post("/", async (req, res) => {
  try {
    const button = new NavbarButtons(req.body);
    await button.save();
    res.json(button);
} catch (err) {
  console.error("Navbar POST error:", err); // log full error in console
  res.status(400).json({ error: err.message }); // return actual error message
}

});

// ✅ UPDATE a navbar button
router.put("/:id", async (req, res) => {
  try {
    const button = await NavbarButtons.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(button);
  } catch (err) {
    res.status(400).json({ error: "Failed to update navbar button" });
  }
});

// ✅ DELETE a navbar button
router.delete("/:id", async (req, res) => {
  try {
    await NavbarButtons.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete navbar button" });
  }
});

module.exports = router;
