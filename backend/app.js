import express from "express";
import configDotenv from "dotenv";
import connectDB from "./config/config.db.js";
import AdminRoute from './Routes/admin.routes.js';
import servicesRoutes from './Routes/addServices.routes.js'
import portfolioRoutes from './Routes/addPortfolio.routes.js'
import cookieParser from 'cookie-parser';
import cors from "cors"; 
configDotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));

const PORT = process.env.PORT || 4000;

// Endpoints 
app.use("/api/admin/auth", AdminRoute);
app.use("/api/admin/services",servicesRoutes)
app.use("/api/admin/portfolio",portfolioRoutes)



app.listen(PORT, () => {
    connectDB();
    console.log(`--> Server is running @ http://localhost:${PORT}`);
});
