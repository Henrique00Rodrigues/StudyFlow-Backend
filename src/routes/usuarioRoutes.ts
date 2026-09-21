import express from "express";
import usuarioController from "../controllers/usuario-controller.js";
import { validarAtualizacaoUsuario } from "../middlewares/usuario-middlewares/validar-atualizacao-usuario.js";

const router = express.Router();

// Buscar dados do usuário logado
router.get("/me", usuarioController.buscarDados);

// Atualizar dados do usuário logado
router.patch("/me", validarAtualizacaoUsuario, usuarioController.atualizar);

// Excluir conta
router.delete("/me", usuarioController.deletar);

export default router;
