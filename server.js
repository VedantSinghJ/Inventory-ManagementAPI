import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js"; 
import authRoutes from "./routes/authRoutes.js";
import componentRoutes from "./routes/componentRoutes.js";


dotenv.config();

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors()); 

app.use(morgan("dev")); 
app.use("/api/auth", authRoutes);
app.use("/api/components", componentRoutes);


connectDB();

// Sample Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
