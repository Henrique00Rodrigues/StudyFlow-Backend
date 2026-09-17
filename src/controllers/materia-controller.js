module.exports = {
  listar: (req, res) => {
    return res.status(200).json({ materias: [] });
  },
  criarMateria: (req, res) => {
    const { nome } = req.body;

    if (typeof nome !== "string") {
      return res
        .status(400)
        .json({ mensagem: "O nome da matéria deve ser do tipo string." });
    }

    if (!nome.trim()) {
      return res.status(400).json({ mensagem: "O campo nome é obrigatório!" });
    }

    const nomeTratado = nome.trim();

    if (nomeTratado.length > 20) {
      return res
        .status(400)
        .json({ mensagem: "O nome deve ter no máximo 20 caracteres." });
    }

    return res
      .status(201)
      .json({ mensagem: `Matéria de ${nomeTratado} criada com sucesso.` });
  },

  atualizarMateria: (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    if (typeof nome !== "string") {
      return res
        .status(400)
        .json({ mensagem: "O nome da matéria deve ser do tipo string." });
    }

    if (!nome.trim()) {
      return res.status(400).json({ mensagem: "O campo nome é obrigatório!" });
    }

    const nomeTratado = nome.trim();

    if (nomeTratado.length > 20) {
      return res
        .status(400)
        .json({ mensagem: "O nome deve ter no máximo 20 caracteres." });
    }

    return res.status(200).json({
      mensagem: "Matéria atualizada com sucesso.",
      materia: {
        id,
        nome: nomeTratado,
      },
    });
  },

  deletar: (req, res) => {
    const { id } = req.params;

    return res.sendStatus(204);
  },
};
