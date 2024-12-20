import express from "express";
import { register, login, refreshToken, logout,verifyEmail, forgetPassword, resetPasswordStore, resetPasswordIndex } from "../controllers/authController.js";

const router = express.Router();

router.post("/register",register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);
router.get("/verifyEmail/:token", verifyEmail);
router.post("/reset/password/store/:token", resetPasswordStore);
router.get("/reset/password/index/:token", resetPasswordIndex);

router.post("/forget-password", forgetPassword);

;


export default router;
