import multerMiddleware from "../Middleware/multer.middleware.js";
import OurClient from "../Models/OurClients.model.js";
import mongoose from "mongoose";

// Add a new client
export const addClient = async (req, res) => {
    const image = req.file ? req.file.path : ""; 
  
    if (!image) {
      return res.status(400).json({
        status: false,
        message: 'Logo/image is required',
      });
    }
  
    try {
      const existingClient = await OurClient.findOne({ image: `http://localhost:${process.env.PORT}/${image}` });
      if (existingClient) {
        return res.status(400).json({
          status: false,
          message: 'Client with this logo already exists',
        });
      }
  
      const newClient = new OurClient({
        image: `http://localhost:${process.env.PORT}/${image}`, 
      });
  
      await newClient.save();
  
      return res.status(200).json({
        status: true,
        message: 'New Client Added Successfully',
        data: newClient,  
      });
    } catch (error) {
      console.error('Error adding client:', error);
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
        error: error.message,  
      });
    }
  };

// get All Clients
export const getAllClients= async(req,res)=>{
    const { skip = 0, limit = 15 } = req.query; // Receive skip and limit from query params

    try {
        const ourClients = await OurClient.find()
        .sort({ createdAt: -1 }) // Sorting by createdAt in descending order
        .skip(parseInt(skip)) // Skip the first 'skip' number of results (for pagination)
        .limit(parseInt(limit)); // Limit the number of items returned
        if(!ourClients){
            return res.status(400).json({
                status:false,
                message:"No Client found"
            })
        }

        const total = await OurClient.countDocuments();

        return res.status(200).json({
            status:true,
            ourClients:ourClients,
            total: total, // Send total count for pagination

        })
    } catch (error) {
        console.log("Error:", error)
        message:"Internal Server Error"
        
    }
}

//get Client by ID
export const getClientById= async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            status: false,
            message: "Invalid Client ID ",
        });
    }
    try {
    
const ourClients = await OurClient.findById(id);
if(!ourClients){
    return res.status(404).json({
        status:false,
        message:"Client Not Found"
    })
}
return res.status(200).json({
    status:true,
    ourClients:ourClients
})

    } catch (error) {
        console.log("Error:",error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
        
    }
}

//update client
export const updateClient=async(req,res)=>{
    const {id}=req.params;
    const image = req.file? req.file.path:null;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          status: false,
          message: 'Invalid Client ID',
        });
      }
    try {

        const ourClients= await OurClient.findById(id);
        if(!ourClients){
            return res.status(404).json({
                status: false,
                message: 'Client not found',
              });
        }
        if(image) ourClients.image=`http://localhost:${process.env.PORT}/${image}`; 
        await ourClients.save();
        return res.status(200).json({
            status: true,
            message: 'Client logo updated successfully',
           ourClients:ourClients,
          });
        
    } catch (error) {

       console.log("Error:",error);
        return res.status(500).json({
            message:"Internal Server Error"
        }) 
    }
}

//delete client
export const deleteClient=async(req,res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            status:false,
            message:"Invalid Client ID"
        })
    }
    try {

        const ourClients = await OurClient.findById(id);
        if(!ourClients){
            return res.status(400).json({
                status:false,
                message:"Client not found"
            })
        }
        
        await OurClient.deleteOne({_id:id});
        return res.status(200).json({
            status:true,
            message:"Client deleted successfully"
        })
    } catch (error) {
        console.log("Error :", error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
        
        
    }
}