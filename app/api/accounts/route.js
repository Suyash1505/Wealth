import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Account from "@/models/Account.models";
import { verifyToken } from "@/middleware/auth";

export async function GET(req) {
  try {

    await connectDB();

    // TOKEN RETURNS USER ID DIRECTLY
    const userId = verifyToken(req);

    const accounts = await Account.find({
      userId: new mongoose.Types.ObjectId(userId),
    })
      .select("name type balance isDefault createdAt")
      .sort({ createdAt: -1 });

    console.log("FETCHED ACCOUNTS:", accounts);

    return Response.json(
      {
        success: true,
        accounts,
      },
      { status: 200 }
    );

  } catch (error) {

    console.error(
      "FETCH ACCOUNTS ERROR:",
      error
    );

    return Response.json(
      {
        success: false,
        message: "UNAUTHORIZED ACCESS",
      },
      { status: 401 }
    );
  }
}