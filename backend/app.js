import express from "express";
import configDotenv from "dotenv";
import connectDB from "./config/config.db.js";
import AdminRoute from './Routes/admin.routes.js';
import servicesRoutes from './Routes/addServices.routes.js';
import portfolioRoutes from './Routes/addPortfolio.routes.js';
import ourClientsRoutes from './Routes/ourClients.routes.js'
import cookieParser from 'cookie-parser';
import cors from "cors"; 
import path from 'path'; 
import { fileURLToPath } from 'url'; 
configDotenv.config();
const app = express();

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Endpoints 
app.use("/api/admin/auth", AdminRoute);
app.use("/api/admin/services", servicesRoutes);
app.use("/api/admin/portfolio", portfolioRoutes);
app.use("/api/admin/client",ourClientsRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    connectDB();
    console.log(`--> Server is running @ http://localhost:${PORT}`);
});
