const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const codingProjectSchema = new Schema({
  title: { type: String, unique: true, required: true },
  description: String,
  url: { type: String, unique: true },
  image: String,
});

module.exports = model("CodingProject", codingProjectSchema);
