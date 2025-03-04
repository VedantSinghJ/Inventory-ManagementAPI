import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
  
      // Default role is "viewer" if not provided
      const userRole = role || "viewer";
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log("🔹 Hashed Password:", hashedPassword); // Debugging line
  
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: userRole, // Assign role
      });
  
      res.status(201).json({ message: "User registered", userId: user._id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// @desc    Login user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      console.log("🔹 Entered Password:", password);
      console.log("🔹 Stored Hashed Password:", user.password);
  
      // Manually compare entered password with stored hash
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("🔹 Password Match Result:", isMatch);
  
      if (isMatch) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
