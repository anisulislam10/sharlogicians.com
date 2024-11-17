import Portfolio from '../Models/addPortfolio.models.js'
import mongoose from 'mongoose'
//add new portfolio 
export const addPortfolio = async (req, res) => {
  const { title, image, type } = req.body

  if (!title || !image || !type) {
    return res.status(400).json({
      status: false,
      message: 'All fields (title, image, type) are required'
    })
  }
  if (!['Magento', 'Wordpress', 'Drupal', 'All'].includes(type)) {
    return res.status(400).json({
      status: false,
      message:
        'Invalid type. Allowed types are Magento, Wordpress, Drupal, and All.'
    })
  }

  try {
    const portfolio = new Portfolio({ title, image, type })
    await portfolio.save()
    return res.status(200).json({
      status: true,
      message: 'Portfolio item added successfully'
    })
  } catch (error) {
    console.error('Error adding portfolio item:', error)
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

//get All Portfolio
export const getAllPortfolioItems=async(req,res)=>{
  try {
    const portfolio= await Portfolio.find();
    if(!portfolio || portfolio.length===0){
      return res.status(400).json({
        status:false,
        message:"Portfolio Item not found"
      });
    }
    return res.status(200).json({
      status:true,
      portfolio:portfolio
    })
  } catch (error) {
    return status(500).json({
      message:"Internal Server Error"
    })
    
  }
}

//get portfolio items by id
export const getPortfolioById=async(req,res)=>{
  const {id}=req.params

         // Validate if the ID is a valid MongoDB ObjectId
          if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
              status: false,
              message: "Invalid service ID format",
          });
          }

  try {

    const portfolio = await Portfolio.findById(id);
    if(!portfolio){
      return res.status(404).json({
        status:false,
        message:"Service Not Found"
    })
    }
    return res.status(200).json({
      status:true,
      portfolio:portfolio
  })
  } catch (error) {
    return res.status(500).json({
      message:"Internal Server Error"
    })
    
  }
}

//update portfolio items
export const updatePortfolioItems=async(req,res)=>{
  const {id}=req.params;
  const { title, image, type}=req.body;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({
      status:false,
      message:"Invalid Portfolio Items ID format"
    })
  }
  
  if(!title && !image && !type){
    return res.status(400).json({
      status:false,
      message: 'At least one field (title, image, type) is required to update',
  });
  }
  try {
    const portfolio= await Portfolio.findById(id);
    if(!portfolio){
      return res.status(404).json({
        status:false,
        message:"Portfolio Item not found"
      });
    }

    if(title) portfolio.title=title;
    if(image) portfolio.image=image;
    if(type) portfolio.type=type;
    await portfolio.save();

    return res.status(200).json({
      status:true,
      message:"Portfolio Item updated successfully"
    })
    
  } catch (error) {
    console.error('Error updating Portfolio:', error);
    return res.status(500).json({
      message:"Internal Server Error"
    })
  }
}

//delete portfolio items
export const deletePortfolioItems=async(req,res)=>{
  const {id}=req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: 'Invalid Portfolio Items ID format',
      });
    }
  try {
    
    const portfolio = await Portfolio.findById(id);
    if(!portfolio){
      return res.status(400).json({
        status: false,
        message: 'Portfolio Item not found',
      });
    }

    await Portfolio.deleteOne({_id:id});
    return res.status(200).json({
      status: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting Portfolio Items:', error); 
    return res.status(500).json({
        message:"Internal Server Error"
    })
  }
}