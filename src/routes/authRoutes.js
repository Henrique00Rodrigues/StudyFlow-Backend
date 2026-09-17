const express = require("express");
const authController = require("../controllers/auth-controller");

const router = express.Router();

// Criar uma nova conta
router.post("/signup", authController.register);

// Fazer login
router.post("/login", authController.login);

// Fazer logout
router.post("/logout", authController.logout);

module.exports = router;
