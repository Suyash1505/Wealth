import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User.models";

export async function POST(req) {

  try {

    await connectDB();
    const body = await req.json();

    let { user_name, email, password } = body;

    // Validate fields
    if (!user_name || !email || !password) {
      return Response.json(
        {
          success: false,
          message: "ALL FIELDS ARE REQUIRED!!!",
        },
        { status: 400 }
      );
    }

    // Normalize email
    email = email.toLowerCase().trim();

    // Validate email
    if (!validator.isEmail(email)) {
      return Response.json(
        {
          success: false,
          message: "INVALID EMAIL ADDRESS!",
        },
        { status: 400 }
      );
    }

    // Strong password validation
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return Response.json(
        {
          success: false,
          message:
            "PASSWORD MUST CONTAIN UPPERCASE, NUMBER AND SYMBOL!",
        },
        { status: 400 }
      );
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "USER ALREADY EXIST",
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      user_name,
      email,
      password: hashedPassword,
    });

    // Check JWT secret
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing");
    }

    // Generate token
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
        message: "USER REGISTER SUCCESSFULLY!",
        token,
        user: {
          id: user._id,
          user_name: user.user_name,
          email: user.email,
        },
      },
      { status: 201 }
    );

  } 
  catch (error) {

    console.error("REGISTER ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "INTERNAL SERVER ERROR!",
      },
      { status: 500 }
    );
  }
}