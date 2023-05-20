const express = require("express");
const router = express.Router();

const { Games, Deck, Users } = require("../../db");

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

  try {
    const gameData = await Games.getGameByID(gameID);
    const currentPlayerID = gameData.current_player;
    const currentPlayer = await Users.getUserByID(gameID, currentPlayerID);
    const playDir = gameData.play_direction;
    const players = await Games.getPlayers(gameID);
    console.log("gameData ", gameData);
    console.log("userID ", userID);
    console.log("currentPLayerID", currentPlayerID);
    console.log("currentPLayer", currentPlayer);
    console.log("playDir ", playDir);
    console.log("players ", players);
    const isUsersTurn = userID == currentPlayerID;
    if (!isUsersTurn) {
      console.log("not your turn");
      res.status(405).json({ message: "not your turn" });
      return;
    }
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
      if (play_card.value == "reverse") {
        await Games.setPlayDirection(gameID, !gameData.play_direction);
      }
      io.emit(`game-state:${gameID}`, {
        play_card,
        hands,
      });
      let nextPlayerJoinOrder = currentPlayer.join_order;
      let playerToPickUp;
      if (playDir) {
        //ascending order
        //we are at the highest join order, next player is join order 1
        if (currentPlayer.join_order >= gameData.players) {
          nextPlayerJoinOrder = 1;
        } else {
          nextPlayerJoinOrder++;
        }
        if (play_card.value == "+2") {
          playerToPickUp = await Users.getUserByJoinOrder(
            gameID,
            nextPlayerJoinOrder
          );
          await Deck.dealCards(gameID, playerToPickUp.user_id, 2);
        }
        if (play_card.value == "+4") {
          playerToPickUp = await Users.getUserByJoinOrder(
            gameID,
            nextPlayerJoinOrder
          );
          await Deck.dealCards(gameID, playerToPickUp.user_id, 4);
        }
        if (
          play_card.value == "skip" ||
          play_card.value == "+2" ||
          play_card.value == "+4"
        ) {
          if (nextPlayerJoinOrder >= gameData.players) {
            nextPlayerJoinOrder = 1;
          } else {
            nextPlayerJoinOrder++;
          }
        }
      } else {
        //descending order
        // we are at join_order 1 next player is game.players (max players)
        if (currentPlayer.join_order == 1) {
          nextPlayerJoinOrder = gameData.players;
        } else {
          nextPlayerJoinOrder--;
        }
        if (play_card.value == "+2") {
          playerToPickUp = await Users.getUserByJoinOrder(
            gameID,
            nextPlayerJoinOrder
          );
          await Deck.dealCards(gameID, playerToPickUp.user_id, 2);
          nextPlayerJoinOrder--;
        }
        if (play_card.value == "+4") {
          playerToPickUp = await Users.getUserByJoinOrder(
            gameID,
            nextPlayerJoinOrder
          );
          await Deck.dealCards(gameID, playerToPickUp.user_id, 4);
          nextPlayerJoinOrder--;
        }
        if (
          play_card.value == "skip" ||
          play_card.value == "+2" ||
          play_card.value == "+4"
        ) {
          if (nextPlayerJoinOrder <= gameData.players) {
            nextPlayerJoinOrder = gameData.players;
          } else {
            nextPlayerJoinOrder--;
          }
        }
      }
      const nextPlayer = await Users.getUserByJoinOrder(
        gameID,
        nextPlayerJoinOrder
      );
      console.log("nextPLayer ", nextPlayer);
      await Games.setNextPlayer(gameID, nextPlayer.user_id);
      res.status(200).json({ message: "Success!" });
    } else {
      console.log("invalid move");
      res.status(405).json({ message: "invalid move" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
