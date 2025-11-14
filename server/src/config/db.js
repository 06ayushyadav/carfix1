import mongoose from "mongoose";
import { config } from "dotenv";

config();

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("Data Base Connection Error ", error.message);
    return error;
  }
};

export default ConnectDB;
