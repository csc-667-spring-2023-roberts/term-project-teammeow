const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../../db/connection.js");
const Users = require("../../db/users.js");

router.get("/login", (req, res) => {
  const context = {
    title: "Login page",
    form_submit_url: "/auth/login",
  };

  res.render("login", context);
});

router.get("/register", (req, res) => {
  const context = {
    title: "Sign-up page",
    form_submit_url: "/auth/register",
  };

  res.render("register", context);
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const salt = await bcrypt.genSalt(15);
  const hash = await bcrypt.hash(password, salt);

  try {
    const { id } = await Users.create(username, email, hash);

    req.session.user = { id, username, email };

    res.redirect("/lobby");
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { password, username } = req.body;
  try {
    const { password: hash, ...user } = await Users.findByUsername(username);

    if (await bcrypt.compare(password, hash)) {
      req.session.user = user;
      res.locals.user = user;
      res.redirect("/lobby");
    } else {
      res.locals.errorMessage = "Username or password is incorrect";
      res.render("login", {
        title: "Login page",
        form_submit_url: "/auth/login",
      });
    }
  } catch (error) {
    res.locals.errorMessage = "Username or password is incorrect";
    res.render("login", {
      title: "Login page",
      form_submit_url: "/auth/login",
    });
  }
});

router.get("/logout", async (req, res) => {
  if (req.session.user) {
    req.session.destroy();
  }
  res.redirect("/");
});

module.exports = router;
