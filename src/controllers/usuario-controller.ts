import type { Request, Response } from "express";
import { HttpError } from "../errors/HttpError.js";

export default {
  buscarDados: (req: Request, res: Response) => {
    const usuario = {
      id: 1,
      apelido: "Henrique",
      email: "usuario@email.com",
      dataCriacao: "15/09/2026",
      fotoPerfil: null,
    };

    return res.status(200).json({
      mensagem: "Usuário encontrado.",
      usuario,
    });
  },

  atualizar: (req: Request, res: Response) => {
    const { apelido, fotoPerfilUrl } = req.body;

    return res.status(200).json({
      mensagem: "Perfil atualizado com sucesso.",
      usuario: {
        ...(apelido !== undefined && {
          apelido,
        }),
        ...(fotoPerfilUrl !== undefined && {
          fotoPerfilUrl,
        }),
      },
    });
  },

  deletar: (_req: Request, res: Response) => {
    return res.sendStatus(204);
  },
};
