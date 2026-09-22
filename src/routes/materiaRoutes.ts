import express from "express";
import materiaController from "../controllers/materia-controller.js";
import { validarCriacaoMateria } from "../middlewares/materia-middlewares/validar-criacao-materia.js";
import { validarIdMateria } from "../middlewares/materia-middlewares/validar-id-materia.js";
import { validarAtualizacaoMateria } from "../middlewares/materia-middlewares/validar-atualizacao-materia.js";

const router = express.Router();

// Listar todas as matérias do usuário logado
router.get("/", materiaController.listar);

// Buscar uma matéria específica. OBS: PROVAVELMENTE NÃO SERÁ USADO
router.get("/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    id,
    nome: "Banco de Dados",
  });
});

// Criar uma nova matéria
router.post("/", validarCriacaoMateria, materiaController.criarMateria);

// Atualizar uma matéria
router.patch(
  "/:id",
  validarIdMateria,
  validarAtualizacaoMateria,
  materiaController.atualizarMateria,
);

// Excluir uma matéria
router.delete("/:id", validarIdMateria, materiaController.deletar);

export default router;
