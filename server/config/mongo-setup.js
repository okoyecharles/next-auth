import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default function connectToMongoDB() {
  mongoose.set("strictQuery", false);
  return mongoose.connect(process.env.MONGO_CONNECTION_URI);
}
