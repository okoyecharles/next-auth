import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function connectToMongoDB() {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGO_CONNECTION_URI).then(() => {
    console.log("Database connected");
  })
}
