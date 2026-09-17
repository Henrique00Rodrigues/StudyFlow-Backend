const express = require("express");

const router = express.Router();

// Listar todas as matérias do usuário logado
router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      nome: "Banco de Dados",
    },
    {
      id: 2,
      nome: "Matemática",
    },
  ]);
});

// Buscar uma matéria específica. OBS: PROVAVELMENTE NÃO SERÁ USADO
router.get("/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    id,
    nome: "Banco de Dados",
  });
});

// Criar uma nova matéria
router.post("/", (req, res) => {
  const { nome } = req.body;

  res.status(201).json({
    mensagem: "Matéria criada com sucesso.",
    materia: {
      nome,
    },
  });
});

// Atualizar uma matéria
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  res.json({
    mensagem: "Matéria atualizada com sucesso.",
    materia: {
      id,
      nome,
    },
  });
});

// Excluir uma matéria
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    mensagem: `Matéria ${id} excluída com sucesso.`,
  });
});

module.exports = router;
