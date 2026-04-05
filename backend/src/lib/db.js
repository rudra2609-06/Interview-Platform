import mongoose from "mongoose";
import { ENV } from "./env.js";

const dbConnect = async () => {
  try {
    await mongoose.connect(ENV.DB_URI);
    console.log("Db connected");

    if (mongoose.connection.readyState >= 1) return;

    // Production-optimized connection options
    const mongoOptions = {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: "majority",
    };

    await mongoose.connect(ENV.DB_URI, mongoOptions);
    console.log("Db connected successfully");

  } catch (error) {
    console.error("Database connection error:", error.message || error);
    throw error;
  }
};

export default dbConnect;
