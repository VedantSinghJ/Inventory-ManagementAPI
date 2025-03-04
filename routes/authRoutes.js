import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Route (Requires Token)
router.get("/profile", protect, getUserProfile);

export default router;
