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
      type: "char(60)",
      notNull: true,
    },
  });
  pgm.addConstraint("users", "username_unq", "UNIQUE(username)");
  pgm.addConstraint(
    "users",
    "username_!blank",
    "CHECK (CHAR_LENGTH(username) >= 1)"
  );
  pgm.addConstraint("users", "email_unq", "UNIQUE(email)");
  pgm.addConstraint(
    "users",
    "password_!blank",
    "CHECK (CHAR_LENGTH(password) >= 1)"
  );
  pgm.createTable("games", {
    id: "id",
    created_by: {
      type: "integer",
      references: "users",
      notNull: true,
    },
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
      type: "boolean",
      notNull: true,
      default: true,
    },
  });
  pgm.addConstraint("games", "room_title_unq", "UNIQUE(room_title)");
  pgm.addConstraint("games", "players_must_be_>=_2", "CHECK (players>=2)");
  pgm.addConstraint("games", "players_must_be_<=_8", "CHECK (players<=8)");
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
      type: "integer",
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
  pgm.sql(
    `INSERT INTO users(username, email, password) VALUES('nathan','nathan@email.com', '$2b$15$bgKJ3bhnNwyG.ZRtAOdzCu7Bf7K6jyFmC.YlSO7OcrkNayrvFcIF6' );`
  );
  pgm.sql(
    `INSERT INTO users(username, email, password) VALUES('ben','ben@email.com', '$2b$15$bgKJ3bhnNwyG.ZRtAOdzCu7Bf7K6jyFmC.YlSO7OcrkNayrvFcIF6' );`
  );
  pgm.sql(
    `INSERT INTO users(username, email, password) VALUES('alex','alex@email.com', '$2b$15$bgKJ3bhnNwyG.ZRtAOdzCu7Bf7K6jyFmC.YlSO7OcrkNayrvFcIF6' );`
  );
  pgm.sql(
    `INSERT INTO users(username, email, password) VALUES('emilee','emilee@email.com', '$2b$15$bgKJ3bhnNwyG.ZRtAOdzCu7Bf7K6jyFmC.YlSO7OcrkNayrvFcIF6' );`
  );

  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('1','green' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('2','green' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('3','green' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('4','green' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('5','green' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('6','green' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('7','green' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('8','green' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('9','green' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('10','green' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('11','green' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('13','green' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('1','yellow' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('2','yellow' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('3','yellow' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('4','yellow' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('5','yellow' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('6','yellow' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('7','yellow' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('8','yellow' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('9','yellow' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('10','yellow' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('11','yellow' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('12','yellow' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('1','blue' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('2','blue' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('3','blue' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('4','blue' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('5','blue' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('6','blue' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('7','blue' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('8','blue' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('9','blue' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('10','blue' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('11','blue' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('12','blue' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('1','red' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('2','red' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('3','red' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('4','red' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('5','red' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('6','red' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('7','red' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('8','red' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('9','red' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('10','red' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('11','red' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('12','red' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('13','black' );`);
  pgm.sql(`INSERT INTO canonical_cards(value, color) VALUES('14','black' );`);

  pgm.sql(
    `INSERT INTO games(created_by, players, room_title) VALUES('1', '4','Cool room' );`
  );
  pgm.sql(
    `INSERT INTO games(created_by, players, room_title) VALUES('1', '3','UnCool room' );`
  );
  pgm.sql(
    `INSERT INTO games(created_by, players, room_title) VALUES('1', '2','Hot room' );`
  );
  pgm.sql(
    `INSERT INTO games(created_by, players, room_title) VALUES('1', '5','Fast room' );`
  );
  pgm.sql(
    `INSERT INTO games(created_by, players, room_title) VALUES('1', '6','Hello room' );`
  );
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
