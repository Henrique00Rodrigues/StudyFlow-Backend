import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../../errors/HttpError.js";

export function validarRegister(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailTratado)) {
    throw new HttpError(400, "O email é inválido.");
  }

  if (
    !emailTratado.endsWith("@gmail.com") &&
    !emailTratado.endsWith("@hotmail.com")
  ) {
    throw new HttpError(400, "O email deve ser Gmail ou Hotmail.");
  }

  if (/\s/.test(senha)) {
    throw new HttpError(400, "A senha não pode conter espaços.");
  }

  if (senha.length < 6) {
    throw new HttpError(400, "A senha deve ter no mínimo 6 caracteres.");
  }

  req.body.apelido = apelido.trim();
  req.body.email = emailTratado;

  next();
}
