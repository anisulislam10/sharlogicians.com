import mongoose from "mongoose";

const ourClientSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const OurClient = mongoose.model("OurClient", ourClientSchema);

export default OurClient;
