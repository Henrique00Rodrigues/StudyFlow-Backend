import express from "express";
import tarefaController from "../controllers/tarefa-controller.js";
import { validarIdMateriaTarefa } from "../middlewares/tarefas-middlewares/validar-id-materia-tarefa.js";
import { validarCriacaoTarefa } from "../middlewares/tarefas-middlewares/validar-criacao-tarefa.js";
import { validarIdTarefa } from "../middlewares/tarefas-middlewares/validar-id-tarefa.js";
import { validarAtualizacaoTarefa } from "../middlewares/tarefas-middlewares/validar-atualizacao-tarefa.js";

const router = express.Router();

// Listar todas as tarefas do usuário logado
router.get("/", tarefaController.listarGlobalmente);

// Listar tarefas de uma matéria específica
router.get(
  "/materia/:materiaId",
  validarIdMateriaTarefa,
  tarefaController.listarTarefasMateria,
);

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
router.post("/", validarCriacaoTarefa, tarefaController.criar);

// Atualizar uma tarefa
router.patch(
  "/:id",
  validarIdTarefa,
  validarAtualizacaoTarefa,
  tarefaController.atualizar,
);

// Excluir uma tarefa
router.delete("/:id", validarIdTarefa, tarefaController.deletar);

export default router;
