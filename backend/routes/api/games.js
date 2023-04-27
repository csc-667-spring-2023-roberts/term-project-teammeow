const express = require("express");
const router = express.Router();
const Games = require("../../db/games.js");

router.post("/join/:id", async (req, res) => {
  // const userID  = req.session.user.id;
  const userID = 3;
  const gameID = req.params.id;
  const io = req.app.get("io");
  try {
    const game = await Games.getGameByID(gameID);
    const { max: lastJoined } = await Games.getjoinOrder(gameID);
    //can join
    console.log("players ", game.players);
    console.log("lastJoined", lastJoined);
    if (game.players > lastJoined) {
      Games.join(gameID, userID, lastJoined + 1);
      req.session.game = game;
      // io.emit(`game:${game.id}:updated`, state)
      res.redirect(`/games/${game.id}`);
    } else {
      //game is full, redidrect to lobby
      console.log("game is full");
      res.redirect("/lobby");
    }
  } catch (err) {
    console.log(err);
    res.json(err);
    res.redirect("./lobby");
  }
});

module.exports = router;
