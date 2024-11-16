import Services from './../Models/addServices.models.js'
import mongoose from 'mongoose';

//add new service
export const addService = async (req, res) => {
  const { title, shortDescription, image } = req.body

  if (!title || !shortDescription) {
    return res.status(400).json({
      status: false,
      message: 'All fields (title, shortDescription, image) are required'
    })
  }

  if (title.length < 3) {
    return res.status(400).json({
      status: false,
      message: 'Title must be at least 3 characters long'
    })
  }

  if (shortDescription.length < 10) {
    return res.status(400).json({
      status: false,
      message: 'Short Description must be at least 10 characters long'
    })
  }
  // console.log("shortdesc::",shortDescription);

  // Validate image URL format (basic check)
  // const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,4}(\/[\w-]*)*\/?$/i;
  // if (!urlPattern.test(image)) {
  //     return res.status(400).json({
  //         status: false,
  //         message: "Invalid image URL format",
  //     });
  // }
  // console.log("URL_Pattren", image);

  try {
    const existingService = await Services.findOne({ title: title })
    if (existingService) {
      return res.status(400).json({
        status: false,
        message: 'Service with this title already exists'
      })
    }

    const newService = new Services({ title, shortDescription, image })
    await newService.save()

    return res.status(200).json({
      status: true,
      message: 'New Service Added Successfully'
    })
  } catch (error) {
    console.error('Error adding service:', error)
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error'
    })
  }
}

//get All-Services
export const getAllServices = async (req, res) => {
  try {
    const service = await Services.find()
    if (!service || service.length === 0) {
      return res.status(404).json({
        stauts: false,
        message: 'No Service Found'
      })
    }
    return res.status(200).json({
      status: true,
      service: service,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

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
export const updateService= async(req,res)=>{
    const {id}=req.params;
    const{title, shortDescription, image}=req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            status:false,
            message:"Invalid Service ID Format"
        })
    }

    if(!title && !shortDescription && !image){
        return res.status(400).json({
            status:false,
            message: 'At least one field (title, shortDescription, image) is required to update',
        });
    }
    if(title &&  title.length<3){
        return res.status(400).json({
            status:false,
            message: 'Short Description must be at least 10 characters long',
        });
    }
    try {
        const service = await Services.findById(id);
        if (!service) {
          return res.status(404).json({
            status: false,
            message: 'Service not found',
          });
        }

        if(title) service.title=title;
        if(shortDescription) service.shortDescription=shortDescription;
        if(image) service.image=image;
        await service.save();

        return res.status(200).json({
            status: true,
            message: 'Service updated successfully',
            service: service,
          });
        
    } catch (error) {
        console.error('Error updating service:', error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

//delte service
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
        console.error('Error deleting service:', error); // Log the detailed error

        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}