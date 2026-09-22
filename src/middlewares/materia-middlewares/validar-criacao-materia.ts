import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../../errors/HttpError.js";

export function validarCriacaoMateria(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const { nome } = req.body;

  if (typeof nome !== "string") {
    throw new HttpError(400, "O nome da matéria deve ser do tipo string.");
  }

  if (!nome.trim()) {
    throw new HttpError(400, "O campo nome é obrigatório.");
  }

  const nomeTratado = nome.trim();

  if (nomeTratado.length > 20) {
    throw new HttpError(400, "O nome deve ter no máximo 20 caracteres.");
  }

  req.body.nome = nomeTratado;

  next();
}
