const express = require("express");
const router = express.Router();

const { Games, Deck } = require("../../db");

router.post("/create", async (req, res) => {
  const io = req.app.get("io");
  const { room, players } = req.body;
  const {
    user: { id: userID },
  } = req.session;
  try {
    const game = await Games.create(userID, players, room);
    await Games.join(game.id, userID, 1);
    await Deck.create(game.id);
    await Deck.dealHand(game.id, userID);

    const state = await Deck.getState(game.id, userID);
    console.log(state);
    io.emit(`game:${game.id}:updated`, state);

    res.redirect(`/game/${game.id}`);
  } catch (err) {
    res.redirect("/lobby");
  }
});

router.post("/join/:id", async (req, res) => {
  const { id: gameID } = req.params;
  const {
    user: { id: userID },
  } = req.session;
  try {
    const game = await Games.getGameByID(gameID);
    const { max: lastJoined } = await Games.getjoinOrder(gameID);

    if (game.players > lastJoined) {
      const state = await Deck.getState(gameID, userID);
      await Deck.dealHand(gameID, userID);
      await Games.join(gameID, userID, lastJoined + 1);

      io.emit(`game:${game.id}:updated`, state);

      res.status(200).json({ message: "Success" });
    } else {
      res.status(401).json({ message: "The room is full" });
    }
  } catch (err) {
    res.redirect("/lobby");
  }
});

module.exports = router;
