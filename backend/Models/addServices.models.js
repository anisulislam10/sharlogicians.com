import mongoose from "mongoose"
const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  image: { 
    type: String, 
    required: false
},

  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Services = mongoose.model('Services', serviceSchema)
export default Services
