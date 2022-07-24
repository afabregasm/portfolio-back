const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

module.exports = model("User", userSchema);
