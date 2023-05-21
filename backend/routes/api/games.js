const express = require("express");
const router = express.Router();

const { Games, Deck } = require("../../db");
const isUsersTurn = require("./isUsersTurn");
const isValidMove = require("./isValidMove");
const nextPlayer = require("./nextPlayer");
const isReverseCard = require("./isReverseCard");
const sendGameState = require("./sendGameState");

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
    const io = req.app.get("io");
    const { id: gameID } = req.params;

    try {
      await Deck.create(gameID);
      const players = await Games.getPlayers(gameID);

      for (const { user_id: userID, join_order } of players) {
        await Deck.dealCards(gameID, userID, 7);
        const hand = await Deck.getHand(gameID, userID);
        io.emit(`deal:${gameID}:${userID}`, { hand, join_order });
      }
      next();
    } catch (err) {
      console.log(err);
    }
  },
  sendGameState
);

router.post(
  "/draw/:id",
  isUsersTurn,
  nextPlayer,
  async (req, res, next) => {
    const io = req.app.get("io");
    const { id: gameID } = req.params;
    const { id: userID } = req.session.user;

    try {
      req.drawnCard = await Deck.dealCard(gameID, userID);

      next();
    } catch (err) {
      console.log(err);
    }
  },
  async (req, res, next) => {
    const io = req.app.get("io");
    const { id: gameID } = req.params;
    const { id: userID } = req.session.user;
    // TODO: check the drawn card is valid to play

    const join_order = 1; // TODO: FIX THIS
    try {
      const drawnCard = await Deck.getCard(req.drawnCard.id);
      const playCard = await Deck.getPlayCard(gameID);
      //valid card, play it
      if (
        playCard.value == drawnCard.value ||
        playCard.color == drawnCard.color ||
        drawnCard.color == "black"
      ) {
        await Deck.updateCard(playCard.id, -1);
        await Deck.updateCard(drawnCard.id, -2);
      }

      //emit state evenif its not a valid card
      const hand = await Deck.getHand(gameID, userID);
      io.emit(`deal:${gameID}:${userID}`, { hand, join_order });
      next();
    } catch (err) {
      console.log(err);
    }
  },
  async (req, res) => {
    const io = req.app.get("io");
    const { id: gameID } = req.params;
    const { join_order } = req.nextPlayer;

    try {
      await Games.setNextPlayer(gameID, join_order);
      const play_card = await Deck.getPlayCard(gameID);
      const players = await Games.getPlayers(gameID);
      const hands = players.map(async ({ user_id: userID }) => {
        const numCards = await Deck.getNumCardsInHand(gameID, userID);
        return { id: userID, hand: numCards };
      });
      io.emit(`game-state:${gameID}`, { play_card, hands });

      res.status(200).json({ message: "Success!" });
    } catch (err) {
      console.log(err);
    }
  }
);

router.post(
  "/move/:id",
  isUsersTurn,
  isValidMove,
  isReverseCard,
  nextPlayer,
  async (req, res, next) => {
    const { id: gameID } = req.params;
    const { players, play_direction } = req.game;
    const nextPlayer = req.nextPlayer;

    try {
      const play_card = await Deck.getPlayCard(gameID);
      //deal cards to the next player if +2 or +4
      if (play_card.value == "+2") {
        await Deck.dealCards(gameID, nextPlayer.user_id, 2);
      } else if (play_card.value == "+4") {
        await Deck.dealCards(gameID, nextPlayer.user_id, 4);
      }

      let nextPlayerJoinOrder = nextPlayer.join_order;
      const gameMaxPlayers = (await Games.getGameByID(gameID)).players;
      //skip the next player if +2, +4, or skip
      if (
        play_card.value == "skip" ||
        play_card.value == "+2" ||
        play_card.value == "+4" ||
        (play_card.value == "reverse" && gameMaxPlayers == 2)
      ) {
        if (play_direction) {
          if (nextPlayerJoinOrder >= players) {
            nextPlayerJoinOrder = 1;
          } else {
            nextPlayerJoinOrder++;
          }
        } else {
          if (nextPlayerJoinOrder <= 1) {
            nextPlayerJoinOrder = players;
          } else {
            nextPlayerJoinOrder--;
          }
        }
      }

      await Games.setNextPlayer(gameID, nextPlayerJoinOrder);

      next();
    } catch (err) {
      console.log(err);
    }
  },
  async (req, res, next) => {
    const io = req.app.get("io");
    const { id: gameID } = req.params;

    try {
      const players = await Games.getPlayers(gameID);
      for (const { user_id: userID, join_order } of players) {
        const hand = await Deck.getHand(gameID, userID);

        io.emit(`deal:${gameID}:${userID}`, { hand, join_order });
      }

      next();
    } catch (err) {
      console.log(err);
    }
  },
  sendGameState
);

router.post("/pass-turn/:id", isUsersTurn, async (req, res, next) => {
  const { id: gameID } = req.params;

  // TODO: this API receives a request to pass the turn
  // when a valid card drawn, but not want to play
});

module.exports = router;
