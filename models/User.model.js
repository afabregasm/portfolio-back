const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  isCompany: Boolean,
  password: { type: String, required: true },
});

module.exports = model("User", userSchema);
