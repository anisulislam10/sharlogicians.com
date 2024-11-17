import mongoose from "mongoose";

const portfolioSchems= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        minLenght:3
    },
    image:{
        type:String,
        require:true
    },
    type:{
        type:String,
        required:true,
        enum:["Magento", "Wordpress", "Drupal", "All"]
    }
})
const Portfolio = mongoose.model('Portfolio', portfolioSchems)
export default Portfolio