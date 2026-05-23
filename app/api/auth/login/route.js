import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { connectDB } from "@/lib/mongodb.js";
import User from "@/models/User.models.js";

export async function POST(req) {

    try {

        // CONNECT TO DATABASE
        await connectDB();

        let { email, password } = await req.json();

        // CHECK FOR MISSING FIELDS
        if (!email || !password) {
            return Response.json(
                {
                    success: false,
                    message: "ALL FIELDS ARE REQUIRED",
                },
                { status: 400 }
            );
        }

        // NORMALIZE EMAIL
        email = email.toLowerCase().trim();

        // FIND USER
        const user = await User.findOne({ email })
            .select("+password");

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "USER DOES NOT EXIST",
                },
                { status: 404 }
            );
        }

        // COMPARE PASSWORD
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return Response.json(
                {
                    success: false,
                    message: "INVALID CREDENTIALS",
                },
                { status: 401 }
            );
        }

        // CHECK JWT SECRET
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET IS MISSING");
        }

        // GENERATE TOKEN
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        return Response.json(
            {
                success: true,
                message: "LOGIN SUCCESSFUL",
                token,
                user: {
                    id: user._id,
                    user_name: user.user_name,
                    email: user.email,
                },
            },
            { status: 200 }
        );

    } 
    catch (error) {

        console.error("LOGIN ERROR:", error);

        return Response.json(
            {
                success: false,
                message: "INTERNAL SERVER ERROR",
            },
            { status: 500 }
        );
    }
}