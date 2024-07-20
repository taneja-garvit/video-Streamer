import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


// Configuration
cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        });

        // File uploaded
        // console.log("File is uploaded on Cloudinary", uploadResult);

        return uploadResult;
        fs.unlinkSync(localFilePath)

    } catch (error) {
        fs.unlinkSync(localFilePath); // Remove the temp saved files from local storage
        console.log("Error uploading file:", error);
        return null;
    }
};

export { uploadOnCloudinary };
