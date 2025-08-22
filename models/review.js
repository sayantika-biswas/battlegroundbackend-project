const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    game: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    avatar: { type: String, required: true }, // will store S3 URL
    date: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
