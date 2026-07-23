import errorHandler from "./middleware/errorHandler.js";  
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

// Connect MongoDB
await mongoose.connect("mongodb://localhost:27017/expenseTrackerDB");
console.log("✅ MongoDB Connected");

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use("/auth", authRoutes);

// Routes
app.use("/expenses", expenseRoutes);
app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("Expense Tracker API is Running !!!");
});

// Start Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});