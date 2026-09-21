import type { Request, Response } from "express";
import { HttpError } from "../errors/HttpError.js";

export default {
  register: (req: Request, res: Response) => {
    const { apelido } = req.body;

    return res.status(201).json({
      mensagem: `Usuário ${apelido.trim()} criado com sucesso!`,
    });
  },

  login: (_req: Request, res: Response) => {
    return res.status(200).json({
      mensagem: "Login válido!",
    });
  },

  logout: (_req: Request, res: Response) => {
    return res
      .status(200)
      .json({ mensagem: `Você foi deslogado com sucesso!` });
  },
};
