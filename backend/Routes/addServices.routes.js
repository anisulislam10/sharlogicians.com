import express from "express";
import upload from "../Middleware/multer.middleware.js"; // Import the configured Multer instance
import {
  addService,
  deleteService,
  getAllServices,
  getServiceById,
  updateService,
} from "../Controllers/addServices.controller.js";
import { verifyAdminToken } from "../Middleware/verifyToken.middleware.js";

const router = express.Router();

// Add Service Route (with Multer middleware for file upload)
router.route("/post").post(
  verifyAdminToken, // Authentication middleware
  upload.single("image"), // Multer middleware for single file upload
  addService // Controller handling the request
);

// Other Routes
router.route("/get").get(getAllServices);
router.route("/:id").get(getServiceById);
router.route("/update/:id").put(verifyAdminToken, updateService);
router.route("/delete/:id").delete(verifyAdminToken, deleteService);

export default router;
