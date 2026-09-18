const express = require("express");
const usuarioController = require("../controllers/usuario-controller");

const router = express.Router();

// Buscar dados do usuário logado
router.get("/me", usuarioController.buscarDados);

// Atualizar dados do usuário logado
router.patch("/me", usuarioController.atualizar);

// Excluir conta
router.delete("/me", usuarioController.deletar);

module.exports = router;
