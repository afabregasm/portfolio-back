const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const projectSchema = new Schema({
  title: { type: String, unique: true, required: true },
  description: String,
  url: { type: String, unique: true },
  images: [String],
});

module.exports = model("Project", projectSchema);
