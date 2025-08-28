  const mongoose = require("mongoose");

  const StoreLinksSchema = new mongoose.Schema({
    type: { type: String, enum: ["apple", "google", "uc", "apk"], required: true, unique: true },
    url: { type: String, required: true },
  }, { timestamps: true });

  module.exports = mongoose.model("StoreLinks", StoreLinksSchema);
