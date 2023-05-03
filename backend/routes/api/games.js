const express = require("express");
const router = express.Router();
const Games = require("../../db/games.js");
const Deck = require("../../db/deck.js");

router.get("/join/:id", async (req, res) => {
  const {
    user: { id: userID },
  } = req.session;
  const gameID = req.params.id;
  const io = req.app.get("io");
  try {
    const game = await Games.getGameByID(gameID);
    const { max: lastJoined } = await Games.getjoinOrder(gameID);
    //can join
    console.log("players ", game.players);
    console.log("lastJoined", lastJoined);
    if (game.players > lastJoined) {
      await Games.join(gameID, userID, lastJoined + 1);
      await Deck.dealHand(gameID, userID);
      req.session.game = game;
      // io.emit(`game:${game.id}:updated`, state)
      res.redirect(`/game/${game.id}`);
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

router.post("/create", async (req, res) => {
  console.log("hit create");
  const {
    user: { id: userID },
  } = req.session;
  const io = req.app.get("io");
  console.log(req.body);
  const players = req.body.players;
  const roomTitle = req.body.room_title;
  try {
    const game = await Games.create(userID, players, roomTitle);
    req.session.game = game;
    res.locals.game = game;
    await Games.join(game.id, userID, 1);
    await Deck.create(game.id);
    await Deck.dealHand(game.id, userID);
    console.log("game created");
    io.emit("game:created", { gameID: game.id, createdAt: game.created_at });
    res.redirect(`/game/${game.id}`);
  } catch (err) {
    console.log(err);
    res.redirect("/lobby");
  }
});

router.get("/hand", async (req, res) => {
  const {
    user: { id: userID },
    game: { id: gameID },
  } = req.session;
  console.log("user ID ", userID);
  console.log("gameID ", gameID);
  try {
    const hand = await Deck.getHand(gameID, userID);
    const playCard = await Deck.getPlayCard(gameID);
    res.status(200).json({ hand, playCard });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
