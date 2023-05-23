const { Deck, Games } = require("../../db");

// checks if the played card is valid
module.exports = async (req, res, next) => {
  const { id: gameID } = req.params;
  const { play_direction } = req.game;

  try {
    const playCard = await Deck.getPlayCard(gameID);
    if ((playCard.value = "reverse")) {
      req.game.play_direction = (
        await Games.setPlayDirection(gameID, !play_direction)
      ).play_direction;
    }
    next();
  } catch (err) {
    res.status(403).json({ message: "could not reverse" });
  }
};
