const { Games } = require("../../db");

// checks if the next is the users turn
module.exports = async (req, res, next) => {
  const { id: gameID } = req.params;
  const { id: userID } = req.session.user;

  try {
    const { current_player, play_direction, players, ...currentTurn } =
      await Games.getCurrentTurn(gameID, userID);

    if (current_player == userID) {
      req.game = { current_player, play_direction, players };
      req.currentTurn = currentTurn;

      next();
    } else {
      res.status(405).json({ message: "not your turn" });
    }
  } catch (err) {
    res.status(405).json({ message: "not your turn" });
  }
};
