const mongoose = require("mongoose");

const BgImgCarouselSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("BgImgCarousel", BgImgCarouselSchema);
