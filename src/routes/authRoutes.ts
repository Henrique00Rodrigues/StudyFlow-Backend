import express from "express";
import authController from "../controllers/auth-controller.js";

const router = express.Router();

// Criar uma nova conta
router.post("/signup", authController.register);

// Fazer login
router.post("/login", authController.login);

// Fazer logout
router.post("/logout", authController.logout);

export default router;
