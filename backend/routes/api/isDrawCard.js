const { Deck } = require("../../db");

module.exports = async (req, res, next) => {
  const { id: gameID } = req.params;
  const { user_id: nextPlayerID } = req.nextPlayer;
  try {
    const play_card = await Deck.getPlayCard(gameID);
    if (play_card.value == "+2") {
      await Deck.dealCards(gameID, nextPlayerID, 2);
    } else if (play_card.value == "+4" && play_card.color == "black") {
      await Deck.dealCards(gameID, nextPlayerID, 4);
    }

    next();
  } catch (err) {
    console.log(err);
  }
};
