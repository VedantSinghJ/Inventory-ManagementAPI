import mongoose from "mongoose";

const inventoryLogSchema = new mongoose.Schema(
  {
    component: { type: mongoose.Schema.Types.ObjectId, ref: "Component", required: true },
    action: { type: String, enum: ["added", "removed", "updated"], required: true },
    quantityChanged: { type: Number, required: true },
    modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const InventoryLog = mongoose.model("InventoryLog", inventoryLogSchema);
export default InventoryLog;
