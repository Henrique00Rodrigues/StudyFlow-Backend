import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../../errors/HttpError.js";

export function validarAtualizacaoTarefa(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const { titulo, descricao, prioridade, concluida, dataEntrega } = req.body;

  if (
    typeof titulo !== "string" ||
    typeof descricao !== "string" ||
    typeof prioridade !== "string" ||
    typeof concluida !== "boolean" ||
    typeof dataEntrega !== "string"
  ) {
    throw new HttpError(400, "Tipo dos campos inválido.");
  }

  if (
    !titulo.trim() ||
    !descricao.trim() ||
    !prioridade.trim() ||
    !dataEntrega.trim()
  ) {
    throw new HttpError(400, "Todos os campos devem ser preenchidos.");
  }

  let prioridadeTratada = prioridade.trim().toLowerCase();

  if (prioridadeTratada === "média") {
    prioridadeTratada = "media";
  }

  const prioridadesValidas = ["baixa", "media", "alta"];

  if (!prioridadesValidas.includes(prioridadeTratada)) {
    throw new HttpError(400, "A prioridade deve ser baixa, média ou alta.");
  }

  const dataEntregaTratada = dataEntrega.trim();

  const formatoData = /^\d{4}-\d{2}-\d{2}$/;

  if (!formatoData.test(dataEntregaTratada)) {
    throw new HttpError(
      400,
      "A data de entrega deve estar no formato AAAA-MM-DD.",
    );
  }

  const [ano, mes, dia] = dataEntregaTratada.split("-").map((n) => +n);

  if (ano === undefined || mes === undefined || dia === undefined) {
    throw new HttpError(400, "A data de entrega é inválida.");
  }

  const data = new Date(ano, mes - 1, dia);

  if (
    data.getFullYear() !== ano ||
    data.getMonth() !== mes - 1 ||
    data.getDate() !== dia
  ) {
    throw new HttpError(400, "A data de entrega é inválida.");
  }

  req.body.titulo = titulo.trim();
  req.body.descricao = descricao.trim();
  req.body.prioridade = prioridadeTratada;
  req.body.dataEntrega = dataEntregaTratada;

  next();
}
