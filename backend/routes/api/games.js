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
    let state = {};
    const game = await Games.getGameByID(gameID);
    const userJoined = await Games.isJoined(gameID, userID);

    if (userJoined) {
      state = await Deck.getState(gameID, userID);

      io.emit(`deal:${game.id}:${userID}`, state);
      res.status(200).json({ message: "Success" });
    } else {
      const { max: lastJoined } = await Games.getjoinOrder(gameID);
      if (game.players > lastJoined) {
        await Games.join(gameID, userID, lastJoined + 1);
        await Deck.dealHand(gameID, userID);

        state = await Deck.getState(gameID, userID);
        io.emit(`deal:${game.id}:${userID}`, state);
        res.status(200).json({ message: "Success" });
      } else {
        res.status(401).json({ message: "The room is full" });
      }
    }
  } catch (err) {
    res.redirect("/lobby");
  }
});

module.exports = router;
