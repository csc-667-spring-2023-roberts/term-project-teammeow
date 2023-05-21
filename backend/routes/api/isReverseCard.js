const { Deck } = require("../../db");
const { Games } = require("../../db");

// checks if the played card is valid
module.exports = async (req, res, next) => {
  const { id: gameID } = req.params;
  const { play_direction } = req.game;

  try {
    const playCard = await Deck.getPlayCard(gameID);
    if ((playCard.value = "reverse")) {
      await Games.setPlayDirection(gameID, !play_direction);
    }
    next();
  } catch (err) {
    res.status(405).json({ message: "could not revere" });
  }
};
