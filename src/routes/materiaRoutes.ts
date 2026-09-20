import express from "express";
import materiaController from "../controllers/materia-controller.js";

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
router.post("/", materiaController.criarMateria);

// Atualizar uma matéria
router.patch("/:id", materiaController.atualizarMateria);

// Excluir uma matéria
router.delete("/:id", materiaController.deletar);

export default router;
