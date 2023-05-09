const db = require("./connection");
class Games {
  static create = (createdBy, maxPlayers, roomTitle) =>
    db.one(
      "INSERT INTO games(created_by, players, players_joined, room_title) VALUES($1, $2, $3, $4) RETURNING *",
      [createdBy, maxPlayers, 1, roomTitle]
    );

  static getByGameByTitle = (roomTitle) =>
    db.one("SELECT * FROM games WHERE room_title = $1", [roomTitle]);

  static getAllGames = () =>
    db.any(
      "SELECT g.*, COUNT(p.user_id) as players_joined FROM games g left JOIN game_players p ON g.id = p.game_id GROUP BY g.id, g.players, g.room_title"
    );

  static getGameByID = (gameID) =>
    db.one("SELECT * FROM games WHERE id = $1", [gameID]);

  static join = (gameID, userID, joinOrder) => {
    //update
    db.none("UPDATE games SET players_joined = $1 WHERE id = $2 ", [
      joinOrder,
      gameID,
    ]);
    db.none(
      "INSERT INTO game_players(game_id, user_id, join_order) VALUES($1, $2, $3)",
      [gameID, userID, joinOrder]
    );
  };

  static getjoinOrder = (gameID) =>
    db.one("SELECT MAX(join_order) FROM game_players WHERE game_id = $1", [
      gameID,
    ]);
}

module.exports = Games;
