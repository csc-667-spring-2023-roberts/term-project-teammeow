const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  const name = "Meow";
  response.render("home", {
    title: "Hi World!",
    message: "Our first template.",
  });})

module.exports = router;
