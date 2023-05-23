const router = require("express").Router();

const { Games, Deck } = require("../../db");

router.get("/:id", async (req, res, next) => {
  const { id: gameID } = req.params;
  const { id: userID } = req.session.user;

  const userJoined = await Games.isJoined(gameID, userID);

  if (userJoined) {
    const { created_by } = await Games.getCreatedBy(gameID);
    res.render("game", { created_by, title: "Game" });
  } else {
    res.redirect("/lobby");
  }
});

router.get(
  "/started/:id",
  async (req, res, next) => {
    const io = req.app.get("io");
    const { id: gameID } = req.params;

    try {
      const players = await Games.getPlayers(gameID);
      for (const { user_id: userID, join_order } of players) {
        const hand = await Deck.getHand(gameID, userID);
        if (hand.length > 0) {
          io.emit(`deal:${gameID}:${userID}`, { hand, join_order });
        }
      }
      next();
    } catch (err) {
      res.status(304).json({ message: "Not started!" });
    }
  },
  async (req, res) => {
    const io = req.app.get("io");
    const { id: gameID } = req.params;

    try {
      const play_card = await Deck.getPlayCard(gameID);
      const hands = await Deck.getNumCardsInHand(gameID);

      if (play_card && hands.length > 0) {
        io.emit(`game-state:${gameID}`, { play_card, hands });
      }
    } catch (err) {
      res.status(304).json({ message: "Not started!" });
    }
  }
);

module.exports = router;
