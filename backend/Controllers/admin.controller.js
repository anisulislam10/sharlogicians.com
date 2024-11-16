import Admin from "../Models/admin.model.js";
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';


//sign-in  --admin api
export const AdminSignin = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      if (!username || !password) {
        return res.status(400).json({
          status: false,
          message: "Username and password are required",
        });
      }
  
      const admin = await Admin.findOne({ username: username.toLowerCase() });
      if (!admin) {
        console.warn(`Failed login attempt for username: ${username}`);
        return res.status(400).json({
          status: false,
          message: "Invalid Credentials",
        });
      }
  
      if (admin.password !== password) {
        console.warn(`Failed login attempt for username: ${username}`);
        return res.status(400).json({
          status: false,
          message: "Invalid Credentials",
        });
      }

  
      // Generate token and set cookie
      generateTokenAndSetCookie(res, admin._id);
  
      admin.lastLogin = new Date();
      await admin.save();
  
      return res.status(200).json({
        status: true,
        message: "Logged-In successfully",
        admin: {
          ...admin._doc,
          password: undefined, 
        },
      });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };
  