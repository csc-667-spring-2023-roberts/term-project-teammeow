const db = require("./connection");
class Users {
  static create = (username, email, hash) =>
    db.one(
      "INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING id",
      [username, email, hash]
    );

  static findByUsername = (username) =>
    db.one("SELECT * FROM users WHERE username = $1", [username]);

  static getUserByID = (userID) =>
    db.one("SELECT id, username, email FROM users WHERE id = $1", [userID]);

  static getUserByJoinOrder = (gameID, joinOrder) =>
    db.one(
      "SELECT * FROM game_players WHERE game_id = $1 AND join_order = $2",
      [gameID, joinOrder]
    );
}

module.exports = Users;
