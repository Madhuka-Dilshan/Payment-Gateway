import dotenv from "dotenv";
dotenv.config(); // must be **first line**

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import paymentRoutes from "./routes/payment.routes.js";

// Connect MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
