import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: String,
    amount: Number,
    currency: String,
    status: String,
    email: String
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
