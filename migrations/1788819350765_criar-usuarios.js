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
  pgm.createType("tipo_usuario", ["usuario", "administrador"]);

  pgm.createTable("usuarios", {
    id: {
      type: "serial",
      primaryKey: true,
    },

    email: {
      type: "varchar(100)",
      notNull: true,
      unique: true,
    },

    senha: {
      type: "varchar(255)",
      notNull: true,
    },

    tipo: {
      type: "tipo_usuario",
      notNull: true,
      default: "usuario",
    },

    data_criacao: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("usuarios");
  pgm.dropType("tipo_usuario");
};
