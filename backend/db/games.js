const db = require("./connection");
class Games {
  static create = (players, room_title) =>
    db.one(
      "INSERT INTO games(players, room_title) VALUES($1, $2) RETURNING id",
      [username, email, hash]
    );

  static findByRoomTitle = (room_title) =>
    db.one("SELECT * FROM games WHERE room_title = $1", [room_title]);
}

module.exports = Games;
