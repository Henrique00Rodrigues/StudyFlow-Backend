import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../../errors/HttpError.js";

export function validarIdTarefa(
  req: Request<{ id: string }>,
  _res: Response,
  next: NextFunction,
) {
  const id = +req.params.id;

  if (!Number.isInteger(id) || id <= 0) {
    throw new HttpError(400, "O ID da tarefa é inválido.");
  }

  next();
}
