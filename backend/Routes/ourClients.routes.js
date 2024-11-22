import express from "express";
import upload from "../Middleware/multer.middleware.js"; // Import the configured Multer instance
import {
  addClient,
  deleteClient,
  getAllClients,
  getClientById,
  updateClient,

} from "../Controllers/ourClients.controller.js"; 
import { verifyAdminToken } from "../Middleware/verifyToken.middleware.js"; 

const router = express.Router();

// Add Client Route (with Multer middleware for file upload)
router.route("/post").post(
  
  upload.single("image"),  
  addClient  
);

router.route("/get").get(getAllClients)
router.route("/:id").get(getClientById)

router.route("/update/:id").put(
  
  upload.single("image"),
  updateClient
)

router.route("/delete/:id").delete(deleteClient)

export default router;
