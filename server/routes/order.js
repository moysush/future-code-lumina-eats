const express = require("express");
const FoodItem = require("../models/FoodItem");
const Order = require("../models/Order");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// receive items only from the client
router.post("/", verifyToken, async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order cannot be empty" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (let item of items) {
      const food = await FoodItem.findById(item.foodItemId);
      if (!food || !food.isAvailable) {
        return res
          .status(400)
          .json({ message: "Item is unavailable or does not exist" });
      }

      orderItems.push({
        foodItem: food._id,
        quantity: item.quantity,
        price: food.price,
      });

      totalAmount += food.price * item.quantity;
    }

    const newOrder = new Order({
      customer: req.user.id,
      items: orderItems,
      totalAmount,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Order creation error: ", err);
    res.status(500).json({ message: "Server error while creating order" });
  }
});

router.get("/my-orders", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id }).populate(
      "items.foodItem",
      "name imageUrl",
    );

    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders: ", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
