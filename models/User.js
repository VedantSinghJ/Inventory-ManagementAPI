import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "engineer", "manager", "viewer"], default: "viewer" },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.password.startsWith("$2b$10$")) {
    return next(); // Prevent rehashing
  }

  console.log("🔹 Before Hashing:", this.password);
  this.password = await bcrypt.hash(this.password, 10);
  console.log("🔹 After Hashing:", this.password);

  next();
});

// Compare password for login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
