import type { Request, Response } from "express";
import usuarioService from "../services/usuario-service.js";
import { HttpError } from "../errors/HttpError.js";

export default {
  buscarDados: async (req: Request, res: Response) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    const usuarioId = req.user.id;

    const usuario = await usuarioService.buscarDados(usuarioId);

    return res.status(200).json({
      mensagem: "Usuário encontrado.",
      usuario,
    });
  },

  atualizar: async (req: Request, res: Response) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    const usuarioId = req.user.id;
    const { apelido, fotoPerfilUrl } = req.body;

    const usuario = await usuarioService.atualizar(usuarioId, {
      apelido,
    });

    return res.status(200).json({
      mensagem: "Perfil atualizado com sucesso.",
      usuario,
    });
  },

  deletar: async (req: Request, res: Response) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    const usuarioId = req.user.id;

    await usuarioService.deletar(usuarioId);

    return res.sendStatus(204);
  },

  atualizarFotoPerfil: async (req: Request, res: Response) => {
    if (!req.user) {
      throw new HttpError(401, "Usuário não autenticado.");
    }

    if (!req.file) {
      throw new HttpError(400, "Nenhuma foto foi enviada.");
    }

    const fotoPerfilUrl = `/uploads/fotos-perfil/${req.file.filename}`;

    const usuarioAtualizado = await usuarioService.atualizarFotoPerfil(
      req.user.id,
      fotoPerfilUrl,
    );

    return res.status(200).json({
      mensagem: "Foto de perfil atualizada com sucesso.",
      usuario: usuarioAtualizado,
    });
  },
};
