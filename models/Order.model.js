const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  userId: String,
  title: { type: String, required: true },
  description: { type: String, required: true },
  modComment: String,
  status: {
    type: String,
    enum: ["approved", "standby", "denied"],
    default: "standby",
  },
});

module.exports = model("Order", orderSchema);
