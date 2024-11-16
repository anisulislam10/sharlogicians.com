import Services from './../Models/addServices.models.js';

// Add service with validation for duplication, required fields, and input format
export const addService = async (req, res) => {
    const { title, shortDescription, image } = req.body;

    // Input Validation: Check if fields are provided
    if (!title || !shortDescription ) {
        return res.status(400).json({
            status: false,
            message: "All fields (title, shortDescription, image) are required",
        });
    }

    // Validate title length
    if (title.length < 3) {
        return res.status(400).json({
            status: false,
            message: "Title must be at least 3 characters long",
        });
    }

    // Validate shortDescription length (optional check)
    if (shortDescription.length < 10) {
        return res.status(400).json({
            status: false,
            message: "Short Description must be at least 10 characters long",
        });
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
        // Check if a service with the same title already exists
        const existingService = await Services.findOne({ title: title });
        if (existingService) {
            return res.status(400).json({
                status: false,
                message: "Service with this title already exists",
            });
        }

        // Create a new service
        const newService = new Services({ title, shortDescription, image });
        await newService.save();

        return res.status(200).json({
            status: true,
            message: "New Service Added Successfully",
        });
    } catch (error) {
        console.error("Error adding service:", error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};
