const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../../db/connection.js");

router.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const saltRounds = 15;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
      // Store hash in your password DB.
      db.any(
        `INSERT INTO users(username, email, password) VALUES($1, $2, $3)`,
        [username, email, hash]
      )
        .then((_) =>
          db.any(`SELECT * FROM users WHERE username = $1`, [username])
        )
        .then((results) => res.json(results))
        .catch((error) => {
          console.log(error);
          res.json({ error });
        });
    });
  });
});

module.exports = router;
