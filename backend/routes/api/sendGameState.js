const { Deck } = require("../../db");

module.exports = async (req, res) => {
  const io = req.app.get("io");
  const { id: gameID } = req.params;

  try {
    const play_card = await Deck.getPlayCard(gameID);
    const hands = await Deck.getNumCardsInHand(gameID);

    io.emit(`game-state:${gameID}`, { play_card, hands });

    res.status(200).json({ message: "Success!" });
  } catch (err) {
    console.log(err);
  }
};
