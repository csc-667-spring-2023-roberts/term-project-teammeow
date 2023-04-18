const db = require("./connection");
class Users {
  static create = (username, email, hash) =>
    db.one(
      "INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING id",
      [username, email, hash]
    );

  static findByUsername = (username) =>
    db.one("SELECT * FROM users WHERE username = $1", [username]);
}

module.exports = Users;
