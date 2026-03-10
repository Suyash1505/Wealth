import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if(!MONGODB_URI){
    throw new Error("Please Define the MONGODB_URI!!!");
}

export const connectDB = async () => {

    if(mongoose.connection.readyState >= 1){
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI)
        console.log("MONGO_DB CONNECTED!!!");
    } 
    catch (error) {
        console.error("MONGO_DB CONNECTION ERROR: ", error );
        
    }
}