const db = require("./connection");
class Games {
  static create = (created_by, players, room_title) =>
    db.one(
      "INSERT INTO games(created_by, players, room_title) VALUES($1, $2, $3) RETURNING *",
      [created_by, players, room_title]
    );

  static findByRoomTitle = (room_title) =>
    db.one("SELECT * FROM games WHERE room_title = $1", [room_title]);
}

module.exports = Games;
