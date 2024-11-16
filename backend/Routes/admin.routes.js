import express from 'express';
import { AdminSignin } from '../Controllers/admin.controller.js';
const router=express.Router();

// router.route("/signup").post(AdminSignup)
// router.route("/verify-email").post(verifyEmail)
router.route("/signin").post(AdminSignin)



export default router;