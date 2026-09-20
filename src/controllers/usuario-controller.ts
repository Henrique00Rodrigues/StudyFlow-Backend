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
    const { apelido, fotoPerfil } = req.body;

    if (apelido === undefined && fotoPerfil === undefined) {
      throw new HttpError(400, "Nenhum campo foi enviado para atualização.");
    }

    if (apelido !== undefined) {
      if (typeof apelido !== "string") {
        throw new HttpError(400, "O apelido deve ser do tipo string.");
      }

      if (!apelido.trim()) {
        throw new HttpError(400, "O apelido não pode estar vazio.");
      }

      if (apelido.trim().length > 30) {
        throw new HttpError(400, "O apelido deve ter no máximo 30 caracteres.");
      }
    }

    if (fotoPerfil !== undefined) {
      if (typeof fotoPerfil !== "string" && fotoPerfil !== null) {
        throw new HttpError(400, "A foto de perfil é inválida.");
      }
    }

    return res.status(200).json({
      mensagem: "Perfil atualizado com sucesso.",
      usuario: {
        ...(apelido !== undefined && {
          apelido: apelido.trim(),
        }),
        ...(fotoPerfil !== undefined && {
          fotoPerfil,
        }),
      },
    });
  },

  deletar: (req: Request, res: Response) => {
    return res.sendStatus(204);
  },
};
