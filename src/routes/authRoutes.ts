import express from "express";
import authController from "../controllers/auth-controller.js";
import { validarRegister } from "../middlewares/auth-middlewares/validar-register.js";
import { validarLogin } from "../middlewares/auth-middlewares/validar-login.js";

const router = express.Router();

// Criar uma nova conta
router.post("/signup", validarRegister, authController.register);

// Fazer login
router.post("/login", validarLogin, authController.login);

// Fazer logout
router.post("/logout", authController.logout);

export default router;
