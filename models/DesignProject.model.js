const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const designProjectSchema = new Schema({
  title: { type: String, unique: true, required: true },
  description: String,
  images: [String],
});

module.exports = model("DesignProject", designProjectSchema);
