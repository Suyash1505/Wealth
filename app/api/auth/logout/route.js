import { connectDB } from "@/lib/mongodb.js";
import User from "@/models/User.models.js";
import { verifyToken } from "@/middleware/auth.js";

export async function POST(req) {

  try {

    // CONNECT TO DATA BASE
    await connectDB();

    // VERIFY TOKE
    const userId = verifyToken(req);

    // CKECK USER EXIST
    const user = await User.findById(userId);

    if (!user) {
      return Response.json({
        success: false,
        message: "USER NOT FOUND"
      });
    }

    return Response.json({
      success: true,
      message: "LOGOUT SUCCESSFUL"
    });

  } catch (error) {

    return Response.json({
      success: false,
      message: error.message
    });

  }

}