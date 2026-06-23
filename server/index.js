require("dotenv").config({ path: ".env.local" });
const { log, error } = require("console");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const authRouter = require("./routes/auth.js");
const foodRouter = require("./routes/foods.js");
const orderRouter = require("./routes/orders.js");
const paymentRouter = require("./routes/payment.js");
const userRouter = require("./routes/users.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => log("Successfully connected to MongoDB Atlas!"))
  .catch((err) => error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);
app.use("/api/foods", foodRouter);
app.use("/api/orders", orderRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/users", userRouter);

app.use((err, req, res, next) => {
  error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(port, () => {
  log(`LuminaEats server listening on port ${port}`);
});
