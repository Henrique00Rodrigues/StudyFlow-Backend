const express = require("express");
const tarefaController = require("../controllers/tarefa-controller");

const router = express.Router();

// Listar todas as tarefas do usuário logado
router.get("/", tarefaController.listarGlobalmente);

// Listar tarefas de uma matéria específica
router.get("/materia/:materiaId", tarefaController.listarTarefasMateria);

// Buscar uma tarefa específica. OBS: PROVAVELMENTE NÃO SERÁ USADO
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
router.post("/", tarefaController.criar);

// Atualizar uma tarefa
router.patch("/:id", tarefaController.atualizar);

// Excluir uma tarefa
router.delete("/:id", tarefaController.deletar);

module.exports = router;
