const { Deck } = require("../../db");
const { Games } = require("../../db");

// checks if the played card is valid
module.exports = async (req, res, next) => {
  const { id: cardID } = req.body;
  const { id: gameID } = req.params;

  try {
    const playCard = await Deck.getPlayCard(gameID);
    const { play_direction } = req.game;
    if ((playCard.value = "reverse")) {
      await Games.setPlayDirection(gameID, !play_direction);
    }
    next();
  } catch (err) {
    res.status(405).json({ message: "could not revere" });
  }
};
