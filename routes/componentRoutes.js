import express from "express";
import {
  createComponent,
  getComponents,
  getComponentById,
  updateComponent,
  deleteComponent,
} from "../controllers/componentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js"; 

const router = express.Router();

// Routes for getting and creating components
router.route("/")
  .get(protect, getComponents) // All authenticated users can view
  .post(protect, authorizeRoles("admin", "engineer", "manager"), createComponent); // Admin, Manager & Engineer can create

// Routes for getting, updating, and deleting a specific component
router.route("/:id")
  .get(protect, getComponentById) // All authenticated users can view
  .put(protect, authorizeRoles("admin", "manager", "engineer"), updateComponent) // Admin & Manager can update any, Engineer only their own
  .delete(protect, authorizeRoles("admin", "engineer"), deleteComponent); // Admin can delete any, Engineer only their own

export default router;
