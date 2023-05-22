const express = require("express");
const router = express.Router();

const { Games, Users } = require("../../db");

router.get("/", async (req, res) => {
  try {
    const games = await Games.getAllGames();

    res.render("lobby", { title: "Lobby", games });
  } catch (err) {
    res.redirect("/auth/login");
  }
});

module.exports = router;
