import type { Request, Response } from "express";

import authService from "../services/auth-service.js";

export default {
  register: async (req: Request, res: Response) => {
    const { apelido, email, senha } = req.body;

    const usuario = await authService.register({
      apelido,
      email,
      senha,
    });

    return res.status(201).json({
      mensagem: `Usuário ${apelido.trim()} criado com sucesso!`,
    });
  },

  login: async (req: Request, res: Response) => {
    const { email, senha } = req.body;

    const usuario = await authService.login({ email, senha });

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
