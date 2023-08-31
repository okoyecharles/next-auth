import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/user-model.js";
import dotenv from "dotenv";
dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:${process.env.PORT}/auth/google/redirect`,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const userExists = await User.findOne({ googleId: profile.id });
        if (userExists) {
          console.log("user already exists");
          done(null, userExists);
        } else {
          const newUser = await new User({
            username: profile.displayName,
            googleId: profile.id,
          }).save();
          console.log("new user created", newUser);
          done(null, newUser);
        }
      } catch (error) {
        console.error(error);
      }
    }
  )
);
