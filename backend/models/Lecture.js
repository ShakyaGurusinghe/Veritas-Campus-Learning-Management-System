const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  file: { type: String }, // path to document
  video: { type: String }, // path to video
  visibility: { type: String, enum: ["Public", "Private"], default: "Private" },
}, { timestamps: true });

module.exports = mongoose.model("Lecture", lectureSchema);
