/* eslinteger-disable camelcase */

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = (pgm) => {
  pgm.createTable("users", {
    // From the docs, "id" is equivalent to: { type: 'serial', primaryKey: true }
    id: "id",
    username: {
      type: "varchar(255)",
      notNull: true,
    },
    email: {
      type: "varchar(255)",
      notNull: true,
    },
    password: {
      type: "varchar(255)",
      notNull: true,
    },
  });
  pgm.createTable("games", {
    id: "id",
    players: {
      type: "integer",
      notNull: true,
    },
    room_title: {
      type: "varchar(255)",
      notNull: true,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    started_at: {
      type: "timestamp",
      default: null,
    },
    play_direction: {
      type: "varchar(255)",
      notNull: true,
    },
  });
  pgm.createTable("game_players", {
    game_id: {
      type: "integer",
      references: "games",
      notNull: true,
    },
    user_id: {
      type: "integer",
      references: "users",
      notNull: true,
    },
    join_order: {
      type: "integer",
      notNull: true,
    },
  });
  pgm.createTable("canonical_cards", {
    id: "id",
    value: {
      type: "varchar(255)",
      notNull: true,
    },
    color: {
      type: "varchar(255)",
      notNull: true,
    },
  });
  pgm.createTable("game_deck", {
    game_id: {
      type: "integer",
      references: "games",
      notNull: true,
    },
    //user_id means that it is in that users hand
    //0 means it in the draw up deck
    //-2 means that it is in the played pile/deck
    //-1 means it is the top card, the card to play on
    user_id: {
      type: "integer",
      references: "users",
      notNull: true,
    },
    card_id: {
      type: "integer",
      references: "canonical_cards",
      notNull: true,
    },
  });
};

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropTable("game_deck");
  pgm.dropTable("canonical_cards");
  pgm.dropTable("game_players");
  pgm.dropTable("games");
  pgm.dropTable("users");
};
