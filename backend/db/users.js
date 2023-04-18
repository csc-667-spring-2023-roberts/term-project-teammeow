const db = require("./connection");
class Users {
  static create = (username, email, hash) =>
    db.any(`INSERT INTO users(username, email, password) VALUES($1, $2, $3)`, [
      username,
      email,
      hash,
    ]);
}

module.exports = Users;
