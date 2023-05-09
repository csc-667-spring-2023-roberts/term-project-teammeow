const db = require("./connection");
class Games {
  static create = (createdBy, players, roomTitle) =>
    db.one(
      "INSERT INTO games(created_by, players, room_title) VALUES($1, $2, $3) RETURNING *",
      [createdBy, players, roomTitle]
    );

  static getByGameByTitle = (roomTitle) =>
    db.one("SELECT * FROM games WHERE room_title = $1", [roomTitle]);

  static getAllGames = () =>
    db.any(
      "SELECT g.*, COUNT(p.user_id) as players_joined FROM games g left JOIN game_players p ON g.id = p.game_id GROUP BY g.id, g.players, g.room_title"
    );

  static getGameByID = (gameID) =>
    db.one("SELECT * FROM games WHERE id = $1", [gameID]);

  static join = (gameID, userID, joinOrder) =>
    db.none(
      "INSERT INTO game_players(game_id, user_id, join_order) VALUES($1, $2, $3)",
      [gameID, userID, joinOrder]
    );

  static getjoinOrder = (gameID) =>
    db.one("SELECT MAX(join_order) FROM game_players WHERE game_id = $1", [
      gameID,
    ]);
}

module.exports = Games;
