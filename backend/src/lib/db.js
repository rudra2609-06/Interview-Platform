import mongoose from "mongoose";
import { ENV } from "./env.js";

const dbConnect = async () => {
  try {
<<<<<<< Updated upstream
    await mongoose.connect(ENV.DB_URI);
    console.log("Db connected");
=======
    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect(ENV.DB_URI);
    console.log("Db connected successfully");
>>>>>>> Stashed changes
  } catch (error) {
    console.error("Database connection error:", error.message || error);
    throw error;
  }
};

export default dbConnect;
