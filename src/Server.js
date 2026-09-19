const express = require("express");
const usuarioRoutes = require("./routes/usuarioRoutes");
const materiaRoutes = require("./routes/materiaRoutes");
const tarefaRoutes = require("./routes/tarefaRoutes");
const flashcardRoutes = require("./routes/flashcardRoutes");
const authRoutes = require("./routes/authRoutes");

const server = express();

server.use(express.json());

server.use("/api/usuarios", usuarioRoutes);
server.use("/api/materias", materiaRoutes);
server.use("/api/tarefas", tarefaRoutes);
server.use("/api/flashcards", flashcardRoutes);
server.use("/api/auth", authRoutes);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}...`);
});
