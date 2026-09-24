import type { Request, Response } from "express";

import {
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_MAX_AGE,
  authCookieOptions,
} from "../config/auth-cookie.js";

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

    const resultado = await authService.login({ email, senha });

    res.cookie(AUTH_COOKIE_NAME, resultado.token, {
      ...authCookieOptions,
      maxAge: AUTH_COOKIE_MAX_AGE,
    });

    return res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      usuario: resultado.usuario,
    });
  },

  logout: (_req: Request, res: Response) => {
    res.clearCookie(AUTH_COOKIE_NAME, authCookieOptions);

    return res
      .status(200)
      .json({ mensagem: `O logout foi realizado com sucesso!` });
  },
};
