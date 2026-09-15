const express = require("express");

const router = express.Router();

// Criar uma nova conta
router.post("/signup", (req, res) => {
  const { apelido, email, senha } = req.body;

  res.status(201).json({
    mensagem: "Usuário criado com sucesso.",
    usuario: {
      apelido,
      email,
    },
  });
});

// Fazer login
router.post("/login", (req, res) => {
  const { email, senha } = req.body;

  res.json({
    mensagem: "Login realizado com sucesso.",
    usuario: {
      email,
    },
  });
});

// Fazer logout
router.post("/logout", (req, res) => {
  res.json({
    mensagem: "Logout realizado com sucesso.",
  });
});

module.exports = router;
