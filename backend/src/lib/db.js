import mongoose from "mongoose";
import { ENV } from "./env.js";

const dbConnect = async () => {
  try {
    await mongoose.connect(ENV.DB_URI);
    console.log("Db connected");
  } catch (error) {
    console.log(error.message || error);
  }
};

export default dbConnect;
