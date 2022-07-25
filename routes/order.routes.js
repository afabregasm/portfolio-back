const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const isAdmin = require("../middleware/admin.middleware");

const User = require("../models/User.model");
const Order = require("../models/Order.model");

// All orders
router.get("/profile", (req, res, next) => {
  const user = req.payload._id;
  User.find({ _id: user })
    .then((thisUser) => res.json(thisUser))
    .catch((err) => res.json(err));
});

// Create order
router.post("/profile", (req, res, next) => {
  const { userId, title, description, reference } = req.body;

  Order.create({ userId, title, description, reference })
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
router.get("/mod-profile", isAdmin, (req, res, next) => {
  Order.find()
    .then((allOrders) => res.json(allOrders))
    .catch((err) => res.json(err));
});

module.exports = router;

// Edit Order
router.put("/profile/:orderId", (req, res, next) => {
  const { orderId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Order.findByIdAndUpdate(orderId, req.body, { new: true })
    .then((updatedOrder) => res.json(updatedOrder))
    .catch((error) => res.json(error));
});
