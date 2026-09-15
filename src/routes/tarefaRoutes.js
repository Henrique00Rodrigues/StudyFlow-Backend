const express = require("express");

const router = express.Router();

// Listar todas as tarefas do usuário logado
router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      titulo: "Estudar SQL",
      descricao: "Revisar JOIN e subqueries",
      prioridade: "alta",
      concluida: false,
      dataEntrega: "20/09/2026",
      materiaId: 1,
    },
  ]);
});

// Listar tarefas de uma matéria específica
router.get("/materia/:materiaId", (req, res) => {
  const { materiaId } = req.params;

  res.json({
    materiaId,
    tarefas: [],
  });
});

// Buscar uma tarefa específica
router.get("/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    id,
    titulo: "Estudar SQL",
    descricao: "Revisar JOIN e subqueries",
    prioridade: "alta",
    concluida: false,
    dataEntrega: "20/09/2026",
    materiaId: 1,
  });
});

// Criar uma tarefa
router.post("/", (req, res) => {
  const { titulo, descricao, prioridade, dataEntrega, materiaId } = req.body;

  res.status(201).json({
    mensagem: "Tarefa criada com sucesso.",
    tarefa: {
      titulo,
      descricao,
      prioridade,
      concluida: false,
      dataEntrega,
      materiaId,
    },
  });
});

// Atualizar uma tarefa
router.patch("/:id", (req, res) => {
  const { id } = req.params;

  const { titulo, descricao, prioridade, concluida, dataEntrega } = req.body;

  res.json({
    mensagem: "Tarefa atualizada com sucesso.",
    tarefa: {
      id,
      titulo,
      descricao,
      prioridade,
      concluida,
      dataEntrega,
    },
  });
});

// Excluir uma tarefa
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    mensagem: `Tarefa ${id} excluída com sucesso.`,
  });
});

module.exports = router;
