import type { Request, Response } from "express";
import { HttpError } from "../errors/HttpError.js";

export default {
  register: (req: Request, res: Response) => {
    const { apelido, email, senha } = req.body;

    if (
      typeof apelido !== "string" ||
      typeof email !== "string" ||
      typeof senha !== "string"
    ) {
      throw new HttpError(400, "Os campos devem ser strings!");
    }

    if (!apelido.trim() || !email.trim() || !senha.trim()) {
      throw new HttpError(400, "Todos os campos são obrigatórios!");
    }

    const emailTratado = email.trim().toLowerCase();

    if (
      !emailTratado.endsWith("@gmail.com") &&
      !emailTratado.endsWith("@hotmail.com")
    ) {
      throw new HttpError(400, "O email deve ser Gmail ou Hotmail.");
    }

    if (senha.length < 6) {
      throw new HttpError(400, "A senha deve ter no mínimo 6 caracteres.");
    }

    return res.status(201).json({
      mensagem: `Usuário ${apelido.trim()} criado com sucesso!`,
    });
  },

  login: (req: Request, res: Response) => {
    const { email, senha } = req.body;

    if (typeof email !== "string" || typeof senha !== "string") {
      throw new HttpError(400, "Email e senha devem ser do tipo string.");
    }

    if (!email.trim() || !senha.trim()) {
      throw new HttpError(400, "Email e senha são obrigatórios.");
    }

    const emailTratado = email.trim().toLowerCase();

    if (
      !emailTratado.endsWith("@gmail.com") &&
      !emailTratado.endsWith("@hotmail.com")
    ) {
      throw new HttpError(400, "O email deve ser Gmail ou Hotmail.");
    }

    if (senha.length < 6) {
      throw new HttpError(400, "A senha deve ter no mínimo 6 caracteres.");
    }

    return res.status(200).json({
      mensagem: "Login válido!",
    });
  },

  logout: (req: Request, res: Response) => {
    return res
      .status(200)
      .json({ mensagem: `Você foi deslogado com sucesso!` });
  },
};
