import express from "express";
import usuarioController from "../controllers/usuario-controller.js";
import { validarAtualizacaoUsuario } from "../middlewares/usuario-middlewares/validar-atualizacao-usuario.js";
import { uploadFotoPerfil } from "../middlewares/usuario-middlewares/upload-foto-perfil.js";

const router = express.Router();

// Buscar dados do usuário logado
router.get("/me", usuarioController.buscarDados);

// Atualizar dados (apelido) do usuário logado
router.patch("/me", validarAtualizacaoUsuario, usuarioController.atualizar);

// Atualizar foto perfil do usuário logado
router.patch(
  "/foto-perfil",
  uploadFotoPerfil.single("fotoPerfil"),
  usuarioController.atualizarFotoPerfil,
);

// Excluir conta
router.delete("/me", usuarioController.deletar);

export default router;
