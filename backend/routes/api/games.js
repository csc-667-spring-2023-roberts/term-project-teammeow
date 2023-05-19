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
    console.log(err);
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
        res.status(401).json({ url: `/lobby` });
        return;
      }
    }

    res.status(200).json({ url: `/game/${gameID}` });
  } catch (err) {
    res.status(401).json({ url: `/lobby` });
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
  // const userID = 1;
  // before sending socket data, check if the turn is this user's (userID)
  const isUsersTurn = true;
  if (!isUsersTurn) {
    res.status(405).json({ message: "not your turn" });
  }
  try {
    const playedCard = await Deck.getCard(cardID);
    const playCard = await Deck.getPlayCard(gameID);
    //valid move
    if (
      playCard.value == playedCard.value ||
      playCard.color == playedCard.color ||
      playedCard.color == "black"
    ) {
      const oldPlayCard = await Deck.updateCard(playCard.id, -1);
      const newPlayCard = await Deck.updateCard(playedCard.id, -2);
      const hands = await Deck.getHand(gameID, userID);
      const play_card = await Deck.getPlayCard(gameID);
      io.emit(`game-state:${gameID}`, {
        play_card,
        hands,
      });
      res.status(200).json({ message: "Success!" });
    } else {
      res.status(405).json({ message: "invalid move" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
