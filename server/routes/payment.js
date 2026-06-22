const express = require("express");
const md5 = require("md5");
const Order = require("../models/Order");

const router = express.Router();
const secret = process.env.PAYHERE_SECRET;

router.post("/webhook", async (req, res) => {
  try {
    const {
      merchant_id,
      order_id,
      payhere_amount,
      payhere_currency,
      status_code,
      md5sig,
    } = req.body;

    const hashedSecret = md5(secret).toUpperCase();

    const localSig = md5(
      merchant_id +
        order_id +
        payhere_amount +
        payhere_currency +
        status_code +
        hashedSecret,
    ).toUpperCase();

    if (status_code === "2") {
      const updatedOrder = await Order.findByIdAndUpdate(
        order_id,
        {
          paymentStatus: "Paid",
          orderStatus: "Preparing",
        },
        { returnDocument: true },
      );
      console.log(updatedOrder);

      if (!updatedOrder) {
        console.error("Webhook verified, but order not found in database");
        return res.status(404).send("Order not found");
      }

      return res.status(200).send("Webhook processed successfully");
    } else {
      console.warn("Webhook signature mismatch or payment failed");
      return res.status(400).send("Invalid signature or payment failed");
    }
  } catch (err) {
    console.error("PayHere webhook error: ", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
