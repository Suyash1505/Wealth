import User from "@/models/User.models.js";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb.js";
import { verifyToken } from "@/middleware/auth.js";

export async function POST(req) {
    
    try {
        await connectDB();
        const userId = verifyToken(req);

        const { oldPassword, newPassword } = await req.json();

        // VALIDATION
        if(!oldPassword || !newPassword){
            return Response.json({
                success: false,
                message: "MISSING REQUIRED FIELDS"
            });
        }

        const user = await User.findById(userId);
        if(!user){
            return Response.json({
                success: false,
                message: 'USER DOES NOT FOUND'
            });
        }

        // CHECK OLD PASSWORD
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            return Response.json({
                success: false,
                message: "WRONG PASSWORD!"
            });
        }

        // HASHED NEW PASSWORD
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return Response.json({
            success: true,
            message: 'PASSWORD UPDATED SUCCESSFULLY!'
        });
    } 
    catch (error) {
        return Response.json({
            success: false,
            message: error.message
        });    
    }
}