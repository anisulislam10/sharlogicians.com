import express from 'express';
import { addService } from '../Controllers/addServices.controller.js';
import { verifyAdminToken } from '../Middleware/verifyToken.middleware.js';
const router=express.Router();
router.route("/post").post(verifyAdminToken,addService)

export default router;