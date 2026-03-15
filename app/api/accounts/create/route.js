import { connectDB } from "@/lib/mongodb";
import { verifyToken } from "@/middleware/auth";
import Account from "@/models/Account.models";

export async function POST(req) {
    try {
        await connectDB();
        const userId = verifyToken(req);
        const { name, type, balance, isDefault } = await req.json();

        // CHECK FOR THE EXISTING ACCOUNT
        const existingAccount = await Account.find( {userId });

        const shouldBeDefault = 
            existingAccount.length === 0 ? true : isDefault;
        
        // REMOVE THE OLD DEFAULT
        if(shouldBeDefault){
            await Account.updateMany(
                { userId, isDefault: true },
                { $set: { isDefault: false } }
            );
        }

        const account = await Account.create({
            name,
            type,
            balance,
            userId,
            isDefault: shouldBeDefault
        });

        return Response.json({
            success: true,
            message: "ACCOUNT CREATED SUCCESSFULLY!",
            account
        })
    } 
    catch (error) {
        return Response.json({
            success: true,
            message: error.message
        })
    }
}
