const express = require("express");
const router = express.Router();

const { Games, Deck } = require("../../db");

router.post("/create", async (req, res) => {
  const { room, players } = req.body;
  const {
    user: { id: userID },
  } = req.session;
  try {
    const game = await Games.create(userID, players, room);
    await Games.join(game.id, userID, 1);

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
    const userJoined = await Games.isJoined(gameID, userID);

    if (!userJoined) {
      const { max: lastJoined } = await Games.getjoinOrder(gameID);

      if (game.players > lastJoined) {
        await Games.join(gameID, userID, lastJoined + 1);
      } else {
        res.status(401).json({ message: "The room is full" });
        return;
      }
    }

    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.redirect("/lobby");
  }
});

router.post("/start/:id", async (req, res) => {
  const { id: gameID } = req.params;
  // const { id: userID } = req.session.user;

  // TODO: IMPLEMENT THIS
  try {
    await Deck.create(gameID);
    const players = await Games.getPlayers(gameID);
    players.forEach(async (x) => {
      const userID = x.user_id;
      await Deck.dealHand(gameID, userID);
      const hands = await Deck.getHand(gameID, userID);
      const io = req.app.get("io");
      io.emit(`deal:${gameID}:${userID}`, { hands });
    });
    res.status(200).json({ message: "Success!" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
