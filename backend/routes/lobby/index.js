const express = require("express");
const router = express.Router();

const { Games } = require("../../db");

router.get("/", async (req, res, next) => {
  try {
    const games = await Games.getAllGames();

    res.render("lobby", { title: "Lobby", games: games });
  } catch (err) {}
});

module.exports = router;
