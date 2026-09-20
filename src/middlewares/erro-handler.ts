import type { ErrorRequestHandler } from "express";
import { HttpError } from "../errors/HttpError.js";

export const erroHandlerMiddleware: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  if (error instanceof HttpError) {
    return res.status(error.status).json({ mensagem: error.message });
  } else if (error instanceof Error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  } else {
    return res
      .status(500)
      .json({ mensagem: "erro interno no servidor desconhecido." });
  }
};
