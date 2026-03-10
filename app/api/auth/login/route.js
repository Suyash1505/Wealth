import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { connectDB } from "@/lib/mongodb.js";
import User from "@/models/User.models.js";

export async function POST(req) {
    
    try {
        await connectDB();
        const { email, password } = await req.json();

        // CHECK FOR THE MISSING FIELS
        if(!email || !password){
            return Response.json({
                success: false,
                message: 'ALL FIELDS ARE REQUIRED!!!'
            });
        }

        // FIND THE USER
        const user = await User.findOne({ email });
        if(!user){
            return Response.json({
                success: false,
                message: "USER DOES NOT EXIST"
            });
        }

        // COMPARE PASSWORD
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return Response.json({
                success: false,
                message: "INVALID CREDENTIALS!"
            });
        }

        // GENERATE TOKEN
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        return Response.json({
            success: true,
            message: "LOGIN SUCCESSFULLY!",
            token
        });
    } 
    catch (error) {
        return Response.json({
            success: false,
            message: error.message
        })    
    }
}