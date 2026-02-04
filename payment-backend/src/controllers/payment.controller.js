import Payment from "../models/Payment.js";
import { generateHash } from "../config/payhere.js";

export const createPayment = async (req, res) => {
  const { orderId, amount, currency, email } = req.body;

  const hash = generateHash(
    process.env.PAYHERE_MERCHANT_ID,
    orderId,
    amount,
    currency,
    process.env.PAYHERE_MERCHANT_SECRET
  );

  await Payment.create({
    orderId,
    amount,
    currency,
    status: "PENDING",
    email
  });

  res.json({
    merchant_id: process.env.PAYHERE_MERCHANT_ID,
    return_url: "http://localhost:5173/payment-success",
    cancel_url: "http://localhost:5173/payment-cancel",
    notify_url: "http://localhost:5000/api/payment/notify",
    order_id: orderId,
    items: "Order Payment",
    amount: amount.toFixed(2),
    currency,
    hash,
    email
  });
};

export const paymentNotify = async (req, res) => {
  const { order_id, status_code } = req.body;

  if (status_code === "2") {
    await Payment.findOneAndUpdate(
      { orderId: order_id },
      { status: "SUCCESS" }
    );
  }

  res.status(200).send("OK");
};
