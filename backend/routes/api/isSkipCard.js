const { Deck } = require("../../db");

module.exports = async (req, res, next) => {
  const { id: gameID } = req.params;
  const { join_order } = req.nextPlayer;
  const { players, play_direction } = req.game;
  let nextPlayerJoinOrder = join_order;

  try {
    const play_card = await Deck.getPlayCard(gameID);

    if (
      play_card.value == "+2" ||
      play_card.value == "+4" ||
      play_card.value == "skip" ||
      (play_card.value == "reverse" && players == 2)
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

      req.nextPlayer = { join_order: nextPlayerJoinOrder };
    }

    next();
  } catch (err) {
    console.log(err);
  }
};
