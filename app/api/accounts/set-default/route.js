import { connectDB } from "@/lib/mongodb"
import { verifyToken } from "@/middleware/auth";
import Account from "@/models/Account.models";


export async function PUT(req) {
    try {
        await connectDB();

        const userId = verifyToken(req);

        // GET THE ACCOUNT
        const { accountId } = await req.json();
        if(!accountId){
            return Response.json({
                success: false,
                message: "ACCOUNT ID DOES NOT EXIST"
            });
        }

        // STEP : 1 REMOVE PREVIOUT DEFAULT ACCOUNT
        await Account.updateMany(
            { userId, isDefault: true },
            { $set: {isDefault: false } }
        );

        // STEP : 2 SET NEW DEFAULT ACCOUNT
        const updateAccount = await Account.findOneAndUpdate(
            {_id: accountId, userId },
            { $set: {isDefault: true } },
            {new : true }
        )
        if(!updateAccount){
            return Response.json({
                success: false,
                message: "ACCOUNT NOT FOUND!"
            });
        }

        return Response.json({
            success: true,
            message: "NEW DEFAULT ACCOUNT IS SET SUCCESSFULLY",
            account: updateAccount
        });
    } 
    catch (error) {
        return Response.json({
            success: false,
            message: error.message
        })    
    }
}