const express = require("express");
const router = express.Router();
const Games = require("../../db/games");

router.get("/", async (req, res, next) => {
  try {
    const games = await Games.getAllGames();
    console.log(games);
    res.render("lobby", { user: req.session.user, title: "Lobby" });
  } catch (err) {}
});

module.exports = router;
