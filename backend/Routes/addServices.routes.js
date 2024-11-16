import express from 'express';
import { addService, deleteService, getAllServices, getServiceById, updateService } from '../Controllers/addServices.controller.js';
import { verifyAdminToken } from '../Middleware/verifyToken.middleware.js';
const router=express.Router();
router.route("/post").post(verifyAdminToken,addService)
router.route("/get").get(getAllServices)
router.route("/:id").get(getServiceById)
router.route("/update/:id").put(verifyAdminToken,updateService)
router.route("/delete/:id").delete(verifyAdminToken,deleteService)

export default router;