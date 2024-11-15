import express from "express"
import  configDotenv  from "dotenv";
import connectDB from "./config/config.db.js";
import AdminRoute from './Routes/admin.routes.js'
import cookieParser from 'cookie-parser';

configDotenv.config();
const app=express();
app.use(express.json()); 
app.use(cookieParser());


const PORT= process.env.PORT || 4000;

//end points
app.use("/api/admin/auth",AdminRoute);

app.listen(PORT,()=>{
    connectDB();
    console.log(`--> Server is running @ http://localhost:${PORT}`);
    
})