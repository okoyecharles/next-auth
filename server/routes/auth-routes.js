import passport from "passport";
import express from "express";
const router = express.Router();

// Get Info from Google user
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

// Handle Redirect after Sign In
router.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    res.send("You reached the callback uri");
  }
);

export default router;