import { Router } from "express";
import authController from "../controller/auth.js";

export const user = Router();

user.post("/sign-up", authController.signUp);

user.post("/sign-in", authController.signIn);
