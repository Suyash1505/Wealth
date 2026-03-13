import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// CONFIGURE CLOUDINARY
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {

    if (!localFilePath) {
      return null;
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "wealth/profile-images"
    });

    // DELETE LOCAL FILE
    await fs.promises.unlink(localFilePath);

    return response;

  } catch (error) {

    if (localFilePath && fs.existsSync(localFilePath)) {
      await fs.promises.unlink(localFilePath);
    }

    console.error("CLOUDINARY UPLOAD ERROR:", error);

    return null;
  }
};

export default uploadOnCloudinary;