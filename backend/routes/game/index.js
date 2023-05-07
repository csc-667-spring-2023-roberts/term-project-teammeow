const router = require("express").Router();
const Games = require("../../db/games");

router.get("/:id", (req, res) => {
  // TODO
  // check if room not full
  // if full redirect to lobby
  // else join game

  res.render("game", { id: req.params.id, title: "Game" });
});

module.exports = router;
