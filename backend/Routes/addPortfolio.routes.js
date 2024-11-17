import express from 'express'
import { addPortfolio, deletePortfolioItems, getAllPortfolioItems, getPortfolioById, updatePortfolioItems } from '../Controllers/addPortfolio.controller.js';
import { verifyAdminToken } from '../Middleware/verifyToken.middleware.js';
const router=express.Router();
router.route("/post").post(verifyAdminToken,addPortfolio);
router.route("/get").get(getAllPortfolioItems)
router.route("/:id").get(getPortfolioById)
router.route("/update/:id").put(verifyAdminToken,updatePortfolioItems)
router.route("/delete/:id").delete(verifyAdminToken,deletePortfolioItems)


export default router