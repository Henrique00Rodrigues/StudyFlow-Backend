const express = require("express");

const router = express.Router();

// Buscar dados do usuário logado
router.get("/me", (req, res) => {
  res.json({
    id: 1,
    apelido: "Henrique",
    email: "usuario@email.com",
    dataCriacao: "15/09/2026",
    fotoPerfil: null,
  });
});

// Atualizar apelido do usuário logado
router.patch("/me", (req, res) => {
  const { apelido, fotoPerfil } = req.body;

  const dadosAtualizados = {};

  if (apelido !== undefined) {
    dadosAtualizados.apelido = apelido;
  }
  if (fotoPerfil !== undefined) {
    dadosAtualizados.fotoPerfil = fotoPerfil;
  }

  res.json({
    mensagem: "Perfil atualizado com sucesso.",
    dadosAtualizados,
  });
});

// Excluir conta
router.delete("/me", (req, res) => {
  res.json({
    mensagem: "Conta excluída com sucesso.",
  });
});

module.exports = router;
