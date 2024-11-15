import mongoose from "mongoose";
import crypto from "crypto"; // For generating a secure token

const AdminSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    default: "admin" 
  },
  isActive: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date // Expiry date for the password reset token
});

// Pre-save hook to update the `updatedAt` field
AdminSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    this.updatedAt = Date.now();
  }
  next();
});


// Export default Admin model
const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
