import type { Request, Response } from "express";

export default {
  listarGlobalmente: (req: Request, res: Response) => {
    return res.status(200).json({ tarefas: [] });
  },

  listarTarefasMateria: (
    req: Request<{ materiaId: string }>,
    res: Response,
  ) => {
    const { materiaId } = req.params;

    return res
      .status(200)
      .json({ materiaId: `${materiaId}`, materia: ``, tarefas: [] });
  },

  criar: (req: Request, res: Response) => {
    const { titulo, descricao, prioridade, dataEntrega, materiaId } = req.body;

    if (
      typeof titulo !== "string" ||
      typeof descricao !== "string" ||
      typeof prioridade !== "string" ||
      typeof dataEntrega !== "string"
    ) {
      return res.status(400).json({
        mensagem: "Tipo dos campos inválido.",
      });
    }

    if (
      !titulo.trim() ||
      !descricao.trim() ||
      !prioridade.trim() ||
      !dataEntrega.trim()
    ) {
      return res
        .status(400)
        .json({ mensagem: "Todos os campos devem ser preenchidos." });
    }

    if (!Number.isInteger(materiaId) || materiaId <= 0) {
      return res.status(400).json({
        mensagem: "O ID da matéria deve ser um número inteiro positivo.",
      });
    }

    let prioridadeTratada = prioridade.trim().toLowerCase();

    const prioridadesValidas = ["baixa", "media", "alta"];

    if (prioridadeTratada === "média") {
      prioridadeTratada = "media";
    }

    if (!prioridadesValidas.includes(prioridadeTratada)) {
      return res.status(400).json({
        mensagem: "A prioridade deve ser baixa, média ou alta.",
      });
    }

    const dataEntregaTratada = dataEntrega.trim();

    const formatoData = /^\d{4}-\d{2}-\d{2}$/;

    if (!formatoData.test(dataEntregaTratada)) {
      return res.status(400).json({
        mensagem: "A data de entrega deve estar no formato AAAA-MM-DD.",
      });
    }

    const [ano, mes, dia] = dataEntregaTratada.split("-").map((n) => +n);

    if (ano === undefined || mes === undefined || dia === undefined) {
      return res.status(400).json({
        mensagem: "A data de entrega é inválida.",
      });
    }

    const data = new Date(ano, mes - 1, dia); //Os meses no JS funcionam como um array ["janeiro", "fevereiro", "março", ...], por conta disso pegamos o índice dele com - 1. Exemplo, "janeiro" = índice 0.

    if (
      data.getFullYear() !== ano ||
      data.getMonth() !== mes - 1 ||
      data.getDate() !== dia
    ) {
      return res.status(400).json({
        mensagem: "A data de entrega é inválida.",
      });
    }

    return res.status(201).json({
      mensagem: `Tarefa criada com sucesso.`,
      tarefa: {
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        prioridade: prioridadeTratada,
        concluida: false,
        dataEntrega: dataEntregaTratada,
        materiaId,
      },
    });
  },

  atualizar: (req: Request<{ id: string }>, res: Response) => {
    const id = +req.params.id;
    const { titulo, descricao, prioridade, concluida, dataEntrega } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        mensagem: "O ID da tarefa é inválido.",
      });
    }

    if (
      typeof titulo !== "string" ||
      typeof descricao !== "string" ||
      typeof prioridade !== "string" ||
      typeof concluida !== "boolean" ||
      typeof dataEntrega !== "string"
    ) {
      return res.status(400).json({
        mensagem: "Tipo dos campos inválido.",
      });
    }

    if (
      !titulo.trim() ||
      !descricao.trim() ||
      !prioridade.trim() ||
      !dataEntrega.trim()
    ) {
      return res
        .status(400)
        .json({ mensagem: "Todos os campos devem ser preenchidos." });
    }

    let prioridadeTratada = prioridade.trim().toLowerCase();

    if (prioridadeTratada === "média") {
      prioridadeTratada = "media";
    }

    const prioridadesValidas = ["baixa", "media", "alta"];

    if (!prioridadesValidas.includes(prioridadeTratada)) {
      return res.status(400).json({
        mensagem: "A prioridade deve ser baixa, média ou alta.",
      });
    }

    const dataEntregaTratada = dataEntrega.trim();

    const formatoData = /^\d{4}-\d{2}-\d{2}$/;

    if (!formatoData.test(dataEntregaTratada)) {
      return res.status(400).json({
        mensagem: "A data de entrega deve estar no formato AAAA-MM-DD.",
      });
    }

    const [ano, mes, dia] = dataEntregaTratada.split("-").map((n) => +n);

    if (ano === undefined || mes === undefined || dia === undefined) {
      return res.status(400).json({
        mensagem: "A data de entrega é inválida.",
      });
    }

    const data = new Date(ano, mes - 1, dia); //Os meses no JS funcionam como um array ["janeiro", "fevereiro", "março", ...], por conta disso pegamos o índice dele com - 1. Exemplo, "janeiro" = índice 0.

    if (
      data.getFullYear() !== ano ||
      data.getMonth() !== mes - 1 ||
      data.getDate() !== dia
    ) {
      return res.status(400).json({
        mensagem: "A data de entrega é inválida.",
      });
    }

    return res.status(200).json({
      mensagem: `Tarefa atualizada com sucesso.`,
      tarefa: {
        id,
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        prioridade: prioridadeTratada,
        concluida,
        dataEntrega: dataEntregaTratada,
      },
    });
  },

  deletar: (req: Request<{ id: string }>, res: Response) => {
    // Quando você tiver banco, o fluxo provavelmente será:
    // receber id
    // ↓
    // validar id
    // ↓
    // buscar tarefa no banco
    // ↓
    // verificar se ela existe
    // ↓
    // verificar se pertence ao usuário
    // ↓
    // deletar
    // ↓
    // 204

    const id = +req.params.id;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        mensagem: "O ID da tarefa é inválido.",
      });
    }

    return res.sendStatus(204);
  },
};
