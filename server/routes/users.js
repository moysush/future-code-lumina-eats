const express = require("express");
const User = require("../models/User");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const customers = await User.find({ "role": "customer" }).select(
      "-password",
    );

    res.status(200).json(customers);
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
