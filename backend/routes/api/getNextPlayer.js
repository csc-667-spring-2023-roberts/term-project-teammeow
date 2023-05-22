const { Users } = require("../../db");

// returns the player next in queue
module.exports = async (req, res, next) => {
  const { id: gameID } = req.params;
  const { join_order } = req.currentTurn;
  const { play_direction, players } = req.game;
  let nextPlayerJoinOrder = join_order;
  if (play_direction) {
    if (join_order >= players) {
      nextPlayerJoinOrder = 1;
    } else {
      nextPlayerJoinOrder++;
    }
  } else {
    if (join_order == 1) {
      nextPlayerJoinOrder = players;
    } else {
      nextPlayerJoinOrder--;
    }
  }

  try {
    req.nextPlayer = await Users.getUserByJoinOrder(
      gameID,
      nextPlayerJoinOrder
    );
    next();
  } catch (err) {
    console.log(err);
  }
};
