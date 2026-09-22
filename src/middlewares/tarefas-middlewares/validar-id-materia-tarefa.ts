import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../../errors/HttpError.js";

export function validarIdMateriaTarefa(
  req: Request<{ materiaId: string }>,
  _res: Response,
  next: NextFunction,
) {
  const materiaId = +req.params.materiaId;

  if (!Number.isInteger(materiaId) || materiaId <= 0) {
    throw new HttpError(400, "O ID da matéria é inválido.");
  }

  next();
}
