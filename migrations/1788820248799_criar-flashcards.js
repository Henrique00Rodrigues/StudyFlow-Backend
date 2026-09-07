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
  pgm.createTable("flashcards", {
    id: {
      type: "serial",
      primaryKey: true,
    },

    frente: {
      type: "text",
      notNull: true,
    },

    verso: {
      type: "text",
      notNull: true,
    },

    acertos: {
      type: "integer",
      notNull: true,
      default: 0,
    },

    erros: {
      type: "integer",
      notNull: true,
      default: 0,
    },

    acertos_consecutivos: {
      type: "integer",
      notNull: true,
      default: 0,
    },

    data_criacao: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },

    data_ultima_revisao: {
      type: "timestamp",
    },

    proxima_revisao: {
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
  pgm.dropTable("flashcards");
};
