const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const { isAdmin } = require("../middleware/admin.middleware");

const User = require("../models/User.model");
const Order = require("../models/Order.model");

router.get("/profile", (req, res, next) => {
  const user = req.payload._id;
  User.findById(user)
    .populate("orders")
    .then((thisUser) => res.json(thisUser))
    .catch((err) => res.json(err));
});

router.post("/profile", (req, res, next) => {
  const { title, description, reference } = req.body;
  const user = req.payload._id;

  Order.create({ title, description, reference })
    .then((response) => {
      User.findByIdAndUpdate(user, { $push: { orders: response._id } })
        .then(() => {
          res.status(200).json("Usuario actualizado.");
        })
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

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

router.get("/all-orders", isAdmin, (req, res, next) => {
  Order.find()
    .then((allOrders) => res.json(allOrders))
    .catch((err) => res.json(err));
});

router.get("/all-orders/:orderId", isAdmin, (req, res, next) => {
  const { orderId } = req.params;
  Order.findById(orderId)
    .then((order) => {
      res.json(order);
    })
    .catch((err) => res.json(err));
});

router.patch("/all-orders/:orderId", isAdmin, (req, res, next) => {
  const { orderId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Order.findByIdAndUpdate(orderId, req.body, { new: true })
    .then((updatedOrder) => res.json(updatedOrder))
    .catch((error) => res.json(error));
});

module.exports = router;
