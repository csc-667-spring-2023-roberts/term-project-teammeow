const express = require("express");
const router = express.Router();

const { Games, Deck } = require("../../db");

const isDrawCard = require("./isDrawCard");
const isWildCard = require("./isWildCard");
const isUsersTurn = require("./isUsersTurn");
const isValidMove = require("./isValidMove");
const isReverseCard = require("./isReverseCard");
const sendGameState = require("./sendGameState");
const sendPlayerHand = require("./sendPlayerHand");
const getNextPlayer = require("./getNextPlayer");
const setNextPlayer = require("./setNextPlayer");
const isSkipCard = require("./isSkipCard");

router.post("/create", async (req, res) => {
  const { room, players } = req.body;
  const { id: userID } = req.session.user;
  if (room.length > 0 && players) {
    try {
      const game = await Games.create(userID, players, room);
      await Games.join(game.id, userID, 1);

      res.redirect(`/game/${game.id}`);
    } catch (err) {
      res.redirect("/lobby");
    }
  } else {
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
      const { max: lastJoined } = await Games.getlastJoinedOrder(gameID);

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

router.post(
  "/start/:id",
  async (req, res, next) => {
    const { id: gameID } = req.params;
    const { id: userID } = req.session.user;

    try {
      const { current_player, play_direction, players, join_order } =
        await Games.getCurrentTurn(gameID, userID);
      req.nextPlayer = { join_order, user_id: userID };
      req.game = { current_player, play_direction, players };

      next();
    } catch (err) {}
  },
  async (req, res, next) => {
    const { id: gameID } = req.params;
    try {
      await Deck.create(gameID);
      const players = await Games.getPlayers(gameID);

      for (const { user_id: userID } of players) {
        await Deck.dealCards(gameID, userID, 7);
      }

      next();
    } catch (err) {
      console.log(err);
    }
  },
  isWildCard,
  isDrawCard,
  isSkipCard,
  setNextPlayer,
  sendPlayerHand,
  sendGameState
);

router.post(
  "/draw/:id",
  isUsersTurn,
  async (req, res, next) => {
    const { id: gameID } = req.params;
    const { id: userID } = req.session.user;

    try {
      const playCard = await Deck.getPlayCard(gameID);
      const drawnCard = await Deck.drawCard(gameID, userID);

      if (
        playCard.value == drawnCard.value ||
        playCard.color == drawnCard.color ||
        drawnCard.color == "black"
      ) {
        await Deck.updateCard(playCard.id, -1);
        await Deck.updateCard(drawnCard.id, -2);
      }

      next();
    } catch (err) {
      console.log(err);
    }
  },
  getNextPlayer,
  isWildCard,
  isDrawCard,
  isSkipCard,
  setNextPlayer,
  sendPlayerHand,
  sendGameState
);

router.post(
  "/move/:id",
  isUsersTurn,
  isValidMove,
  isReverseCard,
  getNextPlayer,
  isWildCard,
  isDrawCard,
  isSkipCard,
  setNextPlayer,
  sendPlayerHand,
  sendGameState
);

module.exports = router;
