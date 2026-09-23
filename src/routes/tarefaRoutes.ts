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
