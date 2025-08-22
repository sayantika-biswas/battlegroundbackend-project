const mongoose = require("mongoose");

const NavbarButtonsSchema = new mongoose.Schema({
  label: { type: String, required: true },
  url: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("NavbarButtons", NavbarButtonsSchema);
