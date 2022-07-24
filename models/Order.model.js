const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  reference: [String],
});

module.exports = model("Order", orderSchema);
