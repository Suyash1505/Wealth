import { connectDB } from "@/lib/mongodb.js";
import User from "@/models/User.models.js";
import { verifyToken } from "@/middleware/auth.js";

export async function PUT(req){
    try {
        await connectDB();
        const userId = verifyToken(req);

        const { user_name, email, password } = await req.json();

        // VALIDATION
        if(!user_name || !email){
            return Response.json({
                success: false,
                message: "MISSING REQUIRED FIELDS"
            });
        }

        // CHECK IF EMAIL ALREADY EXIST
        const existingUser = await User.findOne({ email });
        if(existingUser && existingUser._id.toString() !== userId){
            return Response.json({
                success: false,
                message: "EMAIL ALREADY IN USE"
            });
        }

        // UPDATE THE USER DETAILS
        const updateUser = await User.findByIdAndUpdate(
            userId,
            {
                user_name,
                email
            },
            { new: true }
        ).select("-password");

        return Response.json({
            success: true,
            message: "PROFILE UPDATED SUCCESSFULLY!",
            user: updateUser
        });
    } 
    catch (error) {
        return Response.json({
            success: false,
            message: error.message
        });
    }
}