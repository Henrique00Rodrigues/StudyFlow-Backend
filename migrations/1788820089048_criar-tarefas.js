/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createType("prioridade_tarefa", ["baixa", "media", "alta"]);

  pgm.createTable("tarefas", {
    id: {
      type: "serial",
      primaryKey: true,
    },

    titulo: {
      type: "varchar(150)",
      notNull: true,
    },

    descricao: {
      type: "text",
    },

    prioridade: {
      type: "prioridade_tarefa",
      notNull: true,
    },

    concluida: {
      type: "boolean",
      notNull: true,
      default: false,
    },

    data_criacao: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },

    data_entrega: {
      type: "timestamp",
    },

    materia_id: {
      type: "integer",
      notNull: true,
      references: "materias",
      onDelete: "CASCADE",
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("tarefas");
  pgm.dropType("prioridade_tarefa");
};
