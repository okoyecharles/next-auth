import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import colors from "@colors/colors/safe.js";

import dotenv from "dotenv";
dotenv.config();

import "./config/passport-setup.js";
import connectToMongoDB from "./config/mongo-setup.js";
import authRouter from "./routes/auth-routes.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/auth", authRouter);
app.get("/", (req, res) => res.send("Welcome to your express application!"));

connectToMongoDB();
app.listen(process.env.PORT, () => {
  console.log(colors.cyan("App started"));
});
