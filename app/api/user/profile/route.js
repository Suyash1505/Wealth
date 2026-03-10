import { connectDB } from "@/lib/mongodb.js";
import User from "@/models/User.models.js";
import { verifyToken } from "@/middleware/auth.js";

export async function GET(req) {
    try {
        await connectDB();
        const userId = verifyToken(req);
        
        // GET THE USER DETAILS
        const user = await User.findById(userId).select("-password");
        if(!user){
            return Response.json({
                success: false,
                message: "USER DOES NOT FOUND"
            });
        }

        return Response.json({
            success: true,
            user
        })
    } 
    catch (error) {
        return Response.json({
            success: false,
            message: error.message
        });
    }
}