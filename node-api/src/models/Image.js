const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");


const ImageSchema = new mongoose.Schema({
  galleryName: String,
  description: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

ImageSchema.pre("save", function() {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});

ImageSchema.pre("remove", function() {
    return promisify(fs.unlink)(
      path.resolve(__dirname, "..", "..", "tmp", "uploads", this.key)
    );
});

module.exports = mongoose.model("Image", ImageSchema);