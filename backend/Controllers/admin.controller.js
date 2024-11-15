import Admin from "../Models/admin.model.js";
import bcrypt from "bcryptjs"; // For password hashing
import { sendVerificationEmail } from '../mailtrap/emails.js';

import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';


// Signup Admin
export const AdminSignup = async (req, res) => {
  try {
    const { email, password,name} = req.body;

    if (!email || !password |!name) {
        return res.status(400).json({ message: "All Fields are required" });
      }
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    // Hash password and generate verification token
    const hashPassword = await bcrypt.hash(password, 7);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day expiration


    const hashedPassword = await bcrypt.hash(password, 8);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt
      

    });

    await newAdmin.save();
    generateTokenAndSetCookie(res, newAdmin._id);  
    await sendVerificationEmail(newAdmin.email,verificationToken)

    return res.status(201).json({ 
        message: "Admin created successfully",
        newAdmin:{
            ...newAdmin._doc,
            password: undefined,
          }
    
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//verify email --api
export const verifyEmail = async(req,res)=>{
    try {
        const {code}=req.body;
        const admin=await Admin.findOne({
            verificationToken:code,
            verificationTokenExpiresAt:{$gt:Date.now()}
        })
        if(!admin){
            return res.status(400).json({
                status:false,
                message:"Invalid/Expires Verification Code"
            })
        }
        admin.isActive=true;
       
        await admin.save();
        return res.status(200).json({
            status:true,
            message :"Email Verified Successfully",
            admin:{
                ...admin._doc,
                password:undefined,
                verificationToken:undefined
            }
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

//sign-in
export const AdminSignin = async(req,res)=>{
    const {email, password}=req.body;
    try {
        const admin= await Admin.findOne({email});
        if(!admin){
            return res.status(400).json({
                status:false,
                message:"Invalid Credentials"
            })
        }

        const isPasswordValid= await bcrypt.compare(password,admin.password);
        if(!isPasswordValid){
            return res.status(400).json({
                status:false,
                message:"Invalid Credentials"
            })
        }
        generateTokenAndSetCookie(res,admin._id);
        admin.lastLogin= new Date();
        // verificationToken=undefined

        await admin.save();
        return res.status(200).json({
            status: true,
            message: "Logged-In successfully",
            admin: {
                ...admin._doc,
                password: undefined,
                verificationToken:undefined,
                verificationTokenExpiresAt:undefined

            },
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}