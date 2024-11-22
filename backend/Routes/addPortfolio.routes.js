import express from 'express'
import { 
    addPortfolio, 
    deletePortfolioItems, 
    getAllPortfolioItems, 
    getPortfolioById, 
    updatePortfolioItems 
} from '../Controllers/addPortfolio.controller.js';
import { verifyAdminToken } from '../Middleware/verifyToken.middleware.js';
import upload from '../Middleware/multer.middleware.js';
const router=express.Router();

// Add portfolio Route (with Multer middleware for file upload)
router.route("/post").post(
    upload.single("image"),
    addPortfolio
);


router.route("/get").get(getAllPortfolioItems)
router.route("/:id").get(getPortfolioById)

router.route("/update/:id").put(
    upload.single('image'),
    updatePortfolioItems)

router.route("/delete/:id").delete(deletePortfolioItems)


export default router