const { Games } = require("../../db");

module.exports = async (req, res, next) => {
  const { id: gameID } = req.params;
  const { join_order } = req.nextPlayer;

  try {
    if (!req.wildCardPlayed) {
      await Games.setNextPlayer(gameID, join_order);
    }

    next();
  } catch (err) {
    console.log(err);
  }
};
