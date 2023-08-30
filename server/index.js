import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import colors from "@colors/colors/safe.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (_, res) => {
  res.send("Welcome to your express application!");
});

app.listen(process.env.PORT, () => {
  console.log(colors.cyan("App started"));
});

// Dependencies
// npm i @colors/colors bcryptjs cookie-parser cors dotenv express jsonwebtoken morgan
// npm i -D nodemon
// "type": "module", "script" -> "dev": "nodemon index.js"

