const db = require("./connection");
class Deck {
  static create = async (gameID) => {
    //create deck of 108 cards
    for (var i = 1; i <= 54; i++) {
      let k = 2;
      if (i == 1 || i == 14 || i == 27 || i == 40) {
        k = 1;
      }
      if (i > 52) {
        k = 4;
      }
      for (var j = 0; j < k; j++) {
        db.none(
          "INSERT INTO game_deck(game_id, user_id, card_id) VALUES($1, $2, $3)",
          [gameID, 0, i]
        );
      }
    }
    //set one card for play
    var { id: cardID } = await db.one(
      "SELECT id FROM game_deck WHERE game_id = $1 AND user_id = 0 ORDER BY random() limit 1",
      [gameID]
    );
    db.none("UPDATE game_deck SET user_id = -2 WHERE id = $1", [cardID]);
  };

  static dealHand = async (gameID, userID) => {
    for (let i = 0; i < 7; i++) {
      var { id: cardID } = await db.one(
        "SELECT id FROM game_deck WHERE game_id = $1 AND user_id = 0 ORDER BY random() limit 1",
        [gameID]
      );
      db.none("UPDATE game_deck SET user_id = $1 WHERE id = $2", [
        userID,
        cardID,
      ]);
    }
  };

  static getHand = (gameID, userID) =>
    db.many("SELECT * from game_DECK WHERE game_id = $1 AND user_id = $2", [
      gameID,
      userID,
    ]);
  static getPlayCard = (gameID) =>
    db.one("SELECT * from game_DECK WHERE game_id = $1 AND user_id = -2", [
      gameID,
    ]);
}

module.exports = Deck;
