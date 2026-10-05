import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload_on_cloudinary = async (file_path, folder_name) => {
    try {

        if (!file_path) {
            console.log("File path is required");
            return null;
        }

        const result = await cloudinary.uploader.upload(file_path, {
            resource_type: "image",
            folder: folder_name || "ecommerce_website_media"
        });

        console.log("cloudinary upload result:", result);

        
        fs.unlinkSync(file_path);

        return result;

    } catch (error) {

        console.error(
            "Error uploading to Cloudinary:",
            error.message
        );

        return null;
    }
};

export default upload_on_cloudinary;