const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../../db/connection.js");
const Users = require("../../db/users.js");

router.post("/register", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const saltRounds = 15;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(req.body.password, salt);
  try {
    const { id } = await Users.create(username, email, hash);
    req.session.user = {
      id,
      username,
      email,
    };
    // res.status(201).json({
    //   message: "User created successfully",
    //   user: { id, username, email },
    // });
    localStorage.setItem("user", req.session.user);
    res.redirect("/lobby");
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

router.post("/login", async (req, res) => {
  const user = req.body.username;
  try {
    const {
      id,
      username,
      email,
      password: hash,
    } = await Users.findByUsername(user);
    const result = await bcrypt.compare(req.body.password, hash);
    if (result) {
      req.session.user = {
        id: id,
        username: username,
        email: email,
      };
      localStorage.setItem("user", req.session.user);
      // res.status(200).json({
      //   message: "Logged in succesfully!",
      //   user: { id, username, email },
      // });
      res.redirect("/lobby");
    } else {
      res.status(401).json({ message: "Password not valid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

router.get("/logout", async (req, res) => {
  if (req.session.user) {
    req.session.destroy();
  }
  res.redirect("/");
});

module.exports = router;
