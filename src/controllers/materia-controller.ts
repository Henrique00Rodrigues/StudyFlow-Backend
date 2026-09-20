import type { Request, Response } from "express";
import { HttpError } from "../errors/HttpError.js";

export default {
  listar: (req: Request, res: Response) => {
    return res.status(200).json({ materias: [] });
  },

  criarMateria: (req: Request, res: Response) => {
    const { nome } = req.body;

    if (typeof nome !== "string") {
      throw new HttpError(400, "O nome da matéria deve ser do tipo string.");
    }

    if (!nome.trim()) {
      throw new HttpError(400, "O campo nome é obrigatório!");
    }

    const nomeTratado = nome.trim();

    if (nomeTratado.length > 20) {
      throw new HttpError(400, "O nome deve ter no máximo 20 caracteres.");
    }

    return res
      .status(201)
      .json({ mensagem: `Matéria de ${nomeTratado} criada com sucesso.` });
  },

  atualizarMateria: (req: Request<{ id: string }>, res: Response) => {
    const id = +req.params.id;
    const { nome } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      throw new HttpError(400, "O ID da matéria é inválido.");
    }

    if (typeof nome !== "string") {
      throw new HttpError(400, "O nome da matéria deve ser do tipo string.");
    }

    if (!nome.trim()) {
      throw new HttpError(400, "O campo nome é obrigatório!");
    }

    const nomeTratado = nome.trim();

    if (nomeTratado.length > 20) {
      throw new HttpError(400, "O nome deve ter no máximo 20 caracteres.");
    }

    return res.status(200).json({
      mensagem: "Matéria atualizada com sucesso.",
      materia: {
        id,
        nome: nomeTratado,
      },
    });
  },

  deletar: (req: Request<{ id: string }>, res: Response) => {
    const id = +req.params.id;

    if (!Number.isInteger(id) || id <= 0) {
      throw new HttpError(400, "O ID da matéria é inválido.");
    }

    return res.sendStatus(204);
  },
};
