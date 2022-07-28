const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  modComment: String,
  status: {
    type: String,
    enum: ["Aprobado", "Pendiente", "Denegado"],
    default: "Pendiente",
  },
});

module.exports = model("Order", orderSchema);
