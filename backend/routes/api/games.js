const express = require("express");
const router = express.Router();

const { Games, Deck } = require("../../db");
const isUsersTurn = require("./isUsersTurn");
const isValidMove = require("./isValidMove");
const nextPlayer = require("./nextPlayer");
const isReverseCard = require("./isReverseCard");

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

router.post("/start/:id", async (req, res) => {
  const io = req.app.get("io");
  const { id: gameID } = req.params;

  try {
    await Deck.create(gameID);
    const players = await Games.getPlayers(gameID);
    players.forEach(async ({ user_id: userID }) => {
      await Deck.dealHand(gameID, userID);
      const hand = await Deck.getHand(gameID, userID);
      console.log("playerID: ", userID);
      console.log("hand: ", hand);
      io.emit(`deal:${gameID}:${userID}`, { hand });
    });
    const play_card = await Deck.getPlayCard(gameID);
    // emit how many cards each user have, and the play_card
    // following is the format:
    // play_card: {
    //   id: 1, // cardID
    //   value: 2, // card value
    //   color: "green", // card color
    // },
    const hands = players.map(async ({ user_id: userID }) => {
      const numCards = await Deck.getNumCardsInHand(gameID, userID);
      return { id: userID, hand: numCards };
    });
    console.log("play_card ", play_card);
    const state = {
      play_card,
      hands,
    };

    io.emit(`game-state:${gameID}`, state);

    res.status(200).json({ message: "Success!" });
  } catch (err) {
    console.log(err);
  }
});

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
      io.emit(`deal:${gameID}:${userID}`, { hand });
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

      if (play_card.value == "+2") {
        await Deck.dealCards(gameID, nextPlayer.user_id, 2);
      } else if (play_card.value == "+4") {
        await Deck.dealCards(gameID, nextPlayer.user_id, 4);
      }

      let nextPlayerJoinOrder = nextPlayer.join_order;

      if (
        play_card.value == "skip" ||
        play_card.value == "+2" ||
        play_card.value == "+4"
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
  async (req, res) => {
    const io = req.app.get("io");
    const { id: gameID } = req.params;
    const { id: userID } = req.session.user;

    try {
      const hand = await Deck.getHand(gameID, userID);
      const play_card = await Deck.getPlayCard(gameID);
      const players = await Games.getPlayers(gameID);
      const hands = players.map(async ({ user_id: userID }) => {
        const numCards = await Deck.getNumCardsInHand(gameID, userID);
        return { id: userID, hand: numCards };
      });
      io.emit(`deal:${gameID}:${userID}`, { hand });
      io.emit(`game-state:${gameID}`, { play_card, hands });

      res.status(200).json({ message: "Success!" });
    } catch (err) {
      console.log(err);
    }
  }
);

router.post("/pass-turn/:id", isUsersTurn, async (req, res, next) => {
  const { id: gameID } = req.params;

  // TODO: this API receives a request to pass the turn
  // when a valid card drawn, but not want to play
});

module.exports = router;
