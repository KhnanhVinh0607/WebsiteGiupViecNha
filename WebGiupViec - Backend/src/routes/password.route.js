import express from "express";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/password.controller.js";

const passwordRouter = express.Router();

// Route to initiate password reset (sends reset link to email)
passwordRouter.post("/forgot-password", forgotPassword);

// Route to reset password using the token from the reset link
passwordRouter.post("/reset-password", resetPassword);

export { passwordRouter };
