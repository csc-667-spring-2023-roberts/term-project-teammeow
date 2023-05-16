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
  const io = req.app.get("io");
  const { id: gameID } = req.params;

  try {
    await Deck.create(gameID);
    const players = await Games.getPlayers(gameID);
    players.forEach(async ({ user_id: userID }) => {
      await Deck.dealHand(gameID, userID);
      const hand = await Deck.getHand(gameID, userID);

      io.emit(`deal:${gameID}:${userID}`, { hand });
    });

    // emit how many cards each user have, and the play_card
    // following is the format:
    const state = {
      play_card: {
        id: 1, // cardID
        value: 2, // card value
        color: "green", // card color
      },
      hands: [
        {
          id: 1, // userID
          hand: 6, // # of cards in his hand
        },
        { id: 2, hand: 7 },
      ],
    };

    io.emit(`game-state:${gameID}`, state);

    res.status(200).json({ message: "Success!" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/move/:id", async (req, res) => {
  const io = req.app.get("io");
  const { id: cardID } = req.body;
  const { id: gameID } = req.params;
  const { id: userID } = req.session.user;

  // before sending socket data, check if the turn is this user's (userID)
  const isUsersTurn = true;

  if (isUsersTurn) {
    io.emit(`game-state:${gameID}`, {
      play_card: {
        id: 1, // cardID
        value: 2, // card value
        color: "black", // card color
      },
      hands: [
        {
          id: 1, // userID
          hand: 6, // # of cards in his hand
        },
        { id: 2, hand: 7 },
      ],
    });
  }

  res.status(200).json({ message: "Success!" });
});

module.exports = router;
