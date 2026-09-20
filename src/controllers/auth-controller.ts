import type { Request, Response } from "express";

export default {
  register: (req: Request, res: Response) => {
    const { apelido, email, senha } = req.body;

    if (
      typeof apelido !== "string" ||
      typeof email !== "string" ||
      typeof senha !== "string"
    ) {
      return res.status(400).json({
        mensagem: "Os campos devem ser strings!",
      });
    }

    if (!apelido.trim() || !email.trim() || !senha.trim()) {
      return res.status(400).json({
        mensagem: "Todos os campos são obrigatórios!",
      });
    }

    const emailTratado = email.trim().toLowerCase();

    if (
      !emailTratado.endsWith("@gmail.com") &&
      !emailTratado.endsWith("@hotmail.com")
    ) {
      return res.status(400).json({
        mensagem: "O email deve ser Gmail ou Hotmail.",
      });
    }

    if (senha.length < 6) {
      return res.status(400).json({
        mensagem: "A senha deve ter no mínimo 6 caracteres.",
      });
    }

    return res.status(201).json({
      mensagem: `Usuário ${apelido} criado com sucesso!`,
    });
  },

  login: (req: Request, res: Response) => {
    const { email, senha } = req.body;

    if (typeof email !== "string" || typeof senha !== "string") {
      return res
        .status(400)
        .json({ mensagem: "Email e senha devem ser tipo string." });
    }

    if (!email.trim() || !senha.trim()) {
      return res
        .status(400)
        .json({ mensagem: "Email e senha são obrigatórios." });
    }

    const emailTratado = email.trim().toLowerCase();

    if (
      !emailTratado.endsWith("@gmail.com") &&
      !emailTratado.endsWith("@hotmail.com")
    ) {
      return res.status(400).json({
        mensagem: "O email deve ser Gmail ou Hotmail.",
      });
    }

    if (senha.length < 6) {
      return res.status(400).json({
        mensagem: "A senha deve ter no mínimo 6 caracteres.",
      });
    }

    return res.status(200).json({ mensagem: "Login válido!" });
  },

  logout: (req: Request, res: Response) => {
    return res
      .status(200)
      .json({ mensagem: `Você foi deslogado com sucesso!` });
  },
};
