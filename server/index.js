import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieSession from "cookie-session";
import colors from "@colors/colors/safe.js";
import connectToMongoDB from "./config/mongo-setup.js";

import dotenv from "dotenv";
dotenv.config();

import "./config/passport-setup.js";
import authRouter from "./routes/auth-routes.js";
import passport from "passport";

const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(morgan("dev"));
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_COOKIE_KEY],
  })
);
// register regenerate & save after the cookieSession middleware initialization
app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate)
    request.session.regenerate = (cb) => cb();
  if (request.session && !request.session.save)
    request.session.save = (cb) => cb();
  next();
});
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => res.send("Welcome to your express application!"));
app.use("/auth", authRouter);

connectToMongoDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(colors.cyan("App started"));
  });
});
