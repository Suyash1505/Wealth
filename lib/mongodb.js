import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI in .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {

  // If already connected
  if (cached.conn) {
    return cached.conn;
  }

  // If connection is in progress
  if (!cached.promise) {

    const options = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((mongooseInstance) => {

        console.log("MONGO_DB CONNECTED SUCCESSFULLY!");

        return mongooseInstance;
      });
  }

  try {

    cached.conn = await cached.promise;

  } 
  catch (error) {

    cached.promise = null;

    console.error("MONGO_DB CONNECTION ERROR:", error);

    throw error;
  }

  return cached.conn;
}