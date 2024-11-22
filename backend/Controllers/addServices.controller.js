import Services from './../Models/addServices.models.js'
import multer from 'multer';
import mongoose from 'mongoose';

//add new service
export const addService = async (req, res) => {
  const { title, shortDescription } = req.body;
  const image = req.file ? req.file.path : ""; 
 
  // if (!title || !shortDescription || !image) {
  //   return res.status(400).json({
  //     status: false,
  //     message: 'All fields (title, shortDescription, image) are required',
  //   });
  // }

  if (title.length < 3) {
    return res.status(400).json({
      status: false,
      message: 'Title must be at least 3 characters long',
    });
  }

  if (shortDescription.length < 10) {
    return res.status(400).json({
      status: false,
      message: 'Short Description must be at least 10 characters long',
    });
  }

  try {
    const existingService = await Services.findOne({ title: title });
    if (existingService) {
      return res.status(400).json({
        status: false,
        message: 'Service with this title already exists',
      });
    }

    const newService = new Services({
      title,
      shortDescription,
      image: `http://localhost:${process.env.PORT}/${image}`
    });

    await newService.save();

    return res.status(200).json({
      status: true,
      message: 'New Service Added Successfully',
      data: newService,  
    });
  } catch (error) {
    console.error('Error adding service:', error);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      error: error.message,  
    });
  }
};

//get All-Services
export const getAllServices = async (req, res) => {
  try {
    // Extract page and limit from query params, default to 1 and 5 respectively
    let { page = 1, limit = 5 } = req.query;  
    page = parseInt(page);  // Ensure page is a number
    limit = parseInt(limit);  // Ensure limit is a number
    if (isNaN(page) || isNaN(limit)) {
      return res.status(400).json({ status: false, message: 'Invalid page or limit' });
    }

    const skip = (page - 1) * limit;

    // Count the total number of services in the database
    const total = await Services.countDocuments();

    // Fetch the services with pagination
    const services = await Services.find()
      .sort({ createdAt: -1 })  // Sorting by createdAt in descending order
      .skip(skip)  // Skip 'skip' number of results (for pagination)
      .limit(limit);  // Limit the results to 'limit' number of services

    // If no services are found, return a 404 response
    if (!services || services.length === 0) {
      return res.status(404).json({
        status: false,
        message: 'No Services Found',
      });
    }

    // Return a 200 response with the services and total count for pagination
    return res.status(200).json({
      status: true,
      services: services,  // Renamed from 'service' to 'services' for clarity
      total: total,        // Total number of services for pagination
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error fetching services:', error);

    // Return a generic 500 error with more detailed information
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message, // Send the error message to help debug
    });
  }
};


//get service by id
export const getServiceById = async(req,res)=>{
    const {id}=req.params
       // Validate if the ID is a valid MongoDB ObjectId
       if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: false,
            message: "Invalid service ID format",
        });
    }

    try {
        const service = await Services.findById(id);
        if(!service){
            return res.status(404).json({
                status:false,
                message:"Service Not Found"
            })
        }
        return res.status(200).json({
            status:true,
            service:service
        })
    } catch (error) {
        console.error("Error fetching service by ID:", error);
        return res.status(500).json({
            message: 'Internal Server Error'

        })
    }
}

//update servie
export const updateService = async (req, res) => {
    const { id } = req.params;
    const { title, shortDescription } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: false,
            message: "Invalid Service ID Format",
        });
    }

    try {
        const service = await Services.findById(id);
        if (!service) {
            return res.status(404).json({
                status: false,
                message: "Service not found",
            });
        }

        if (title) service.title = title;
        if (shortDescription) service.shortDescription = shortDescription;
        if (image) service.image = `http://localhost:${process.env.PORT}/uploads/${image}`;

        await service.save();
        return res.status(200).json({
            status: true,
            message: "Service updated successfully",
            service,
        });
    } catch (error) {
        console.error("Error updating service:", error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};
//delete service
export const deleteService=async(req,res)=>{
    const {id}=req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          status: false,
          message: 'Invalid service ID format',
        });
      }
    try {
        const service= await Services.findById(id);
        if(!service){
            return res.status(400).json({
                status: false,
                message: 'Service not found',
              });
        }

        await Services.deleteOne({ _id: id });
        return res.status(200).json({
            status: true,
            message: 'Service deleted successfully',
          });
        
    } catch (error) {
        console.error('Error deleting service:', error); 

        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}