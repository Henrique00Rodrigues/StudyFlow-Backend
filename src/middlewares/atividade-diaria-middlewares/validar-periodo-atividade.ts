import type { NextFunction, Request, Response } from "express";

import { HttpError } from "../../errors/HttpError.js";

export function validarPeriodoAtividade(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const ano = Number(req.query.ano);
  const mes = Number(req.query.mes);

  if (!req.query.ano || !req.query.mes) {
    throw new HttpError(400, "Ano e mês são obrigatórios.");
  }

  if (!Number.isInteger(ano) || !Number.isInteger(mes)) {
    throw new HttpError(400, "Ano e mês devem ser números inteiros.");
  }

  if (mes < 1 || mes > 12) {
    throw new HttpError(400, "O mês deve estar entre 1 e 12.");
  }

  if (ano < 2000 || ano > 2100) {
    throw new HttpError(400, "Ano inválido.");
  }

  next();
}
