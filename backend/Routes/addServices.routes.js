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
  
  upload.single("image"), 
  addService 
);

router.route("/get").get(getAllServices);
router.route("/:id").get(getServiceById);

// Multer middleware for handling image upload
router.route("/update/:id").put(
    upload.single('image'), 
    updateService 
  );
router.route("/delete/:id").delete(deleteService);

export default router;
