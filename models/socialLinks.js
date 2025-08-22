const mongoose = require("mongoose");

const SocialLinksSchema = new mongoose.Schema({
  type: { type: String, enum: ["instagram", "facebook", "youtube", "discord"], required: true, unique: true },
  url: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("SocialLinks", SocialLinksSchema);
