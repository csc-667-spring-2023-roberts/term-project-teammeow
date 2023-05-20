const db = require("./connection");
class Games {
  static create = (createdBy, maxPlayers, roomTitle) =>
    db.one(
      "INSERT INTO games(created_by, players, players_joined, room_title, current_player) VALUES($1, $2, $3, $4, $1) RETURNING *",
      [createdBy, maxPlayers, 1, roomTitle]
    );

  static getGameByTitle = (roomTitle) =>
    db.one("SELECT * FROM games WHERE room_title = $1", [roomTitle]);

  static getAllGames = () =>
    db.any(
      "SELECT g.*, COUNT(p.user_id) as players_joined FROM games g left JOIN game_players p ON g.id = p.game_id GROUP BY g.id, g.players, g.room_title"
    );

  static getGameByID = (gameID) =>
    db.one("SELECT * FROM games WHERE id = $1", [gameID]);

  static getCreatedBy = (gameID) =>
    db.one("SELECT created_by, id FROM games WHERE id = $1", [gameID]);

  static isJoined = async (gameID, userID) => {
    const result = await db.any(
      "SELECT * FROM game_players WHERE game_id = $1 AND user_id = $2",
      [gameID, userID]
    );

    return result.length > 0;
  };

  static join = async (gameID, userID, joinOrder) => {
    const result = await db.any(
      "SELECT * FROM game_players WHERE game_id = $1 AND user_id = $2",
      [gameID, userID]
    );

    if (result.length == 0) {
      db.none(
        "INSERT INTO game_players(game_id, user_id, join_order) VALUES($1, $2, $3)",
        [gameID, userID, joinOrder]
      );
    }
  };

  static getlastJoinedOrder = (gameID) =>
    db.one("SELECT MAX(join_order) FROM game_players WHERE game_id = $1", [
      gameID,
    ]);

  static getPlayers = (gameID) =>
    db.many("SELECT * FROM game_players WHERE game_id = $1", [gameID]);

  static setNextPlayer = (gameID, userID) =>
    db.one("UPDATE games SET current_player = $1 WHERE id = $2 RETURNING *", [
      userID,
      gameID,
    ]);

  static setPlayDirection = (gameID, playDirection) =>
    db.one("UPDATE games SET play_direction = $1 WHERE id = $2 RETURNING *", [
      gameID,
      playDirection,
    ]);
}

module.exports = Games;
