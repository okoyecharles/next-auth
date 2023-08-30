import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import colors from "@colors/colors/safe.js";
import passport from "passport";

import dotenv from "dotenv";
dotenv.config();

import "./config/passport-setup.js";

const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(morgan("dev"));
app.use(cookieParser());

// Get Info from Google user
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

// Handle Redirect after Sign In
app.get(
  "/auth/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    res.send("You reached the callback uri");
  }
);

app.get("/", (_, res) => {
  res.send("Welcome to your express application!");
});

app.listen(process.env.PORT, () => {
  console.log(colors.cyan("App started"));
});
