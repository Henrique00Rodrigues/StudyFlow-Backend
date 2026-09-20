import express from "express";
import usuarioController from "../controllers/usuario-controller.js";

const router = express.Router();

// Buscar dados do usuário logado
router.get("/me", usuarioController.buscarDados);

// Atualizar dados do usuário logado
router.patch("/me", usuarioController.atualizar);

// Excluir conta
router.delete("/me", usuarioController.deletar);

export default router;
