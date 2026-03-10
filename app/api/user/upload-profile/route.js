import fs from "fs";
import uploadOnCloudinary from "@/lib/cloudinary.js";
import User from "@/models/User.models.js";

import { connectDB } from "@/lib/mongodb.js";
import { verifyToken } from "@/middleware/auth.js";

export async function POST(req) {
    try {
        await connectDB();
        const userId = verifyToken(req);
        const formatData = await req.formatData();

        // GET THE IMAGE    
        const image = await formatData.get("image");
        if(!image){
            return Response.json({
                success: false,
                message: "PROFILE IMAGE IS NEEDED TO US!"
            });
        }

        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const tempPath = `/tmp/${image.name}`;
        await fs.promises.writeFile(tempPath, buffer);
        const result = await uploadOnCloudinary(tempPath);

        if(!result){
            return Response.json({
                success: false,
                message: "IMAGE UPLOAD FAILED...TRY AGAIN"
            });
        }

        await User.findByIdAndUpdate(userId, 
            { profilePic : result.secure_url }
        );

        return Response.json({
            success: true,
            message: "PROFILE UPLOADED SUCCESSFULLY",
            image: result.secure_url
        })

    } 
    catch (error) {
        return Response.json({
            success: false,
            message: error.message
        });
    }
}