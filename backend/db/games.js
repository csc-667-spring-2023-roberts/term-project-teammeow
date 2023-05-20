const db = require("./connection");
class Games {
  static create = (createdBy, maxPlayers, roomTitle) =>
    db.one(
      "INSERT INTO games(created_by, players, room_title, current_player) VALUES($1, $2, $3, $1) RETURNING *",
      [createdBy, maxPlayers, roomTitle]
    );

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

  static getCurrentTurn = async (gameID, userID) => {
    const result = await db.one(
      `SELECT game_players.*, games.play_direction, games.current_player, games.players
      FROM game_players INNER JOIN games
      ON game_players.game_id = games.id
      WHERE game_id = $1 AND user_id = $2`,
      [gameID, userID]
    );

    return result;
  };

  static join = async (gameID, userID, joinOrder) =>
    db.none(
      "INSERT INTO game_players(game_id, user_id, join_order) VALUES($1, $2, $3)",
      [gameID, userID, joinOrder]
    );

  static getlastJoinedOrder = (gameID) =>
    db.one("SELECT MAX(join_order) FROM game_players WHERE game_id = $1", [
      gameID,
    ]);

  static getPlayers = (gameID) =>
    db.many("SELECT * FROM game_players WHERE game_id = $1", [gameID]);

  static setNextPlayer = (gameID, joinOrder) =>
    db.none(
      `UPDATE games SET current_player = (SELECT user_id FROM game_players WHERE join_order = $2) WHERE id = $1`,
      [gameID, joinOrder]
    );

  static setPlayDirection = (gameID, playDirection) =>
    db.one("UPDATE games SET play_direction = $1 WHERE id = $2 RETURNING *", [
      playDirection,
      gameID,
    ]);
}

module.exports = Games;
