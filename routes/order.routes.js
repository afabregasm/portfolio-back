const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const User = require("../models/User.model");
const Order = require("../models/Order.model");

// All orders
router.get("/profile", (req, res, next) => {
  Order.find()
    .then((allOrders) => res.json(allOrders))
    .catch((err) => res.json(err));
});

// Create order
router.post("/profile", (req, res, next) => {
  const { title, description, reference } = req.body;

  Order.create({ title, description, reference })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

// Delete Order
router.delete("/profile/:orderId", (req, res, next) => {
  const { orderId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Order.findByIdAndRemove(orderId)
    .then(() =>
      res.json({
        message: "Your order was removed successfully.",
      })
    )
    .catch((error) => res.json(error));
});

// ------------------------------------------------------- //
//                      MOD ROUTES                         //
// ------------------------------------------------------- //

// All orders from all users
router.get("/mod-profile", async (req, res, next) => {
  const userId = req.user._id;
  try {
    const users = await User.find();
  } catch {
    res.json(error);
  }
});

module.exports = router;
