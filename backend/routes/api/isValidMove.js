const { Deck } = require("../../db");

// checks if the played card is valid
module.exports = async (req, res, next) => {
  const { id: cardID } = req.body;
  const { id: gameID } = req.params;

  try {
    const playedCard = await Deck.getCard(cardID);
    const playCard = await Deck.getPlayCard(gameID);

    if (
      playCard.value == playedCard.value ||
      playCard.color == playedCard.color ||
      playCard.color == "black" ||
      playedCard.color == "black"
    ) {
      await Deck.updateCard(playCard.id, -1);
      await Deck.updateCard(playedCard.id, -2);

      next();
    } else {
      res.status(405).json({ message: "invalid move" });
    }
  } catch (err) {
    res.status(405).json({ message: "invalid move" });
  }
};
