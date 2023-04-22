const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  const name = "Meow";
  response.render("home", {
    title: "Hi World!",
    message: "Our first template.",
  });
});

router.get("/auth/login", (req, res) => {
  const context = {
    title: "Login page",
    form_submit_url: "/auth/login",
  };

  res.render("login", context);
});

router.get("/auth/register", (req, res) => {
  const context = {
    title: "Sign-up page",
    form_submit_url: "/auth/register",
  };

  res.render("register", context);
});

module.exports = router;
