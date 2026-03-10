import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { connectDB } from "@/lib/mongodb.js";
import User from "@/models/User.models.js";

export async function POST(req) {
    try {
        
        // CONNECT TO DATA BASE
        await connectDB();

        const { user_name, email, password } = await req.json();

        // CHECK FOR THE MISSING FIELDS
        if(!user_name || !email || !password){
            return Response.json({
                success: false,
                message: "MISSING DETAILS..."
            });
        }

        // VALIDATE EMAIL
        if(!validator.isEmail(email)){
            return Response.json({
                success: false,
                message: "INVALID EMAIL..."
            });
        }

        // CHECK FOR STRONG PASSWORD
        if(password.length < 8){
            return Response.json({
                success: false,
                message: "PASSWORD MUST BE 8 CHARACTERS!"
            });
        }

        // CHECK IF USER ALREADY EXIST
        const existingUser = await User.findOne({email});
        if(existingUser){
            return Response.json({
                success: false,
                message: "USER ALREADY EXIST."
            });
        }

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        // CREATE USER
        const user = await User.create({
            user_name,
            email,
            password: hashedPassword
        });

        // GENERATE JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        return Response.json({
            success: true,
            message: "USER CREATED SUCCESSFULLY",
            token
        });
    } 
    catch (error) {
        return Response.json({
            success: false,
            message: error.message
        });
    }
}