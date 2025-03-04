import mongoose from "mongoose";

const componentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    manufacturer: { type: String, required: true },
    status: { type: String, enum: ["Available", "In Use", "Damaged"], default: "Available" },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Component = mongoose.model("Component", componentSchema);
export default Component;
