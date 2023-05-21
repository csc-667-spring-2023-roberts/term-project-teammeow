const { Deck } = require("../../db");

// checks if the played card is a wild card
module.exports = async (req, res, next) => {
  const io = req.app.get("io");
  const { id: gameID } = req.params;
  const { id: userID } = req.session.user;

  try {
    const playedCard = req.playedCard;

    if (playedCard.color == "black") {
      const wildCards = await Deck.getWildCards(gameID, playedCard.value);
      io.emit(`pick-color:${gameID}:${userID}`, { wildCards });

      res.status(200).json({ message: "Success" });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(405).json({ message: "invalid move" });
  }
};
