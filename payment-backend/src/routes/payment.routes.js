import express from "express";
import {
  createPayment,
  paymentNotify
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create", createPayment);
router.post("/notify", paymentNotify);

export default router;
