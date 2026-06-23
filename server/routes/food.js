const express = require("express");
const FoodItem = require("../models/FoodItem");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const foodItems = await FoodItem.findMany();
    res.status(200).json(foodItems);
  } catch (err) {
    console.error("Error fetching food items:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, isAvailable } =
      req.body;

    const newFood = new FoodItem({
      name,
      description,
      price,
      category,
      imageUrl,
      isAvailable,
    });

    const savedFood = await newFood.save();
    res.status(201).json(savedFood);
  } catch (err) {
    console.error("Error creating new food:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updatedFood = await FoodItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: true },
    );
    if (!updatedFood)
      return res.status(404).json({ message: "Food item not found" });
    res.json(updatedFood);
  } catch (err) {
    console.error("Error updating food item: ", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const deletedFood = await FoodItem.findByIdAndDelete(req.params.id);
    if (!deletedFood)
      return res.status(404).json({ message: "Food item not found" });
    res.json({ message: "Food item deleted successfully" });
  } catch (err) {
    console.error("Error deleting food item:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
