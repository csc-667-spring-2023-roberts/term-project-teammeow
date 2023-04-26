const express = require("express");
const router = express.Router();
const Games = require("../../db/games.js");

router.post("/create", async (req, res) => {
  console.log("hit create");
  // const userID  = req.session.user.id;
  const userID = 1;
  const io = req.app.get("io");
  console.log(req.body);
  const players = req.body.players;
  const roomTitle = req.body.room_title;
  try {
    const game = await Games.create(userID, players, roomTitle);
    req.session.game = game;
    res.locals.game = game;
    await Games.join(game.id, userID, 1);
    console.log("game created");
    io.emit("game:created", { gameID: game.id, createdAt });
    res.redirect(`/games/${game.id}`);
  } catch (err) {
    console.log(err);
    res.redirect("/lobby");
  }
});

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
