import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../../errors/HttpError.js";

export function validarCriacaoFlashcard(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const { frente, verso, materiaId } = req.body;

  if (typeof frente !== "string" || typeof verso !== "string") {
    throw new HttpError(400, "Frente e verso devem ser strings.");
  }

  if (!frente.trim() || !verso.trim()) {
    throw new HttpError(400, "Frente e verso são obrigatórios.");
  }

  if (!Number.isInteger(materiaId) || materiaId <= 0) {
    throw new HttpError(400, "O ID da matéria é inválido.");
  }

  req.body.frente = frente.trim();
  req.body.verso = verso.trim();

  next();
}
