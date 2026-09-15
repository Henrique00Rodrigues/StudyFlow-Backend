const express = require("express");
const usuarioRoutes = require("./routes/usuarioRoutes");
const materiaRoutes = require("./routes/materiaRoutes");
const tarefaRoutes = require("./routes/tarefaRoutes");
const flashcardRoutes = require("./routes/flashcardRoutes");
const authRoutes = require("./routes/authRoutes");

const server = express();

server.use(express.json());

server.use("/usuarios", usuarioRoutes);
server.use("/materias", materiaRoutes);
server.use("/tarefas", tarefaRoutes);
server.use("/flashcards", flashcardRoutes);
server.use("/auth", authRoutes);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}...`);
});
