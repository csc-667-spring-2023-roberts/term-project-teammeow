const { Games, Deck } = require("../../db");

module.exports = async (req, res, next) => {
  const io = req.app.get("io");
  const { id: gameID } = req.params;

  try {
    const players = await Games.getPlayers(gameID);
    for (const { user_id: userID, join_order } of players) {
      const hand = await Deck.getHand(gameID, userID);

      io.emit(`deal:${gameID}:${userID}`, { hand, join_order });
    }

    next();
  } catch (err) {
    console.log(err);
  }
};
