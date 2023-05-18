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
    db.many(
      `SELECT game_deck.id, canonical_cards.value, canonical_cards.color 
      FROM game_deck 
      INNER JOIN canonical_cards 
      ON game_deck.card_id = canonical_cards.id 
      WHERE game_id = $1 AND user_id = $2 `,
      [gameID, userID]
    );
  static getPlayCard = (gameID) =>
    db.one(
      `SELECT game_deck.id, canonical_cards.value, canonical_cards.color 
      FROM game_deck 
      INNER JOIN canonical_cards 
      ON game_deck.card_id = canonical_cards.id 
      WHERE game_id = $1 AND user_id = -2 `,
      [gameID]
    );
  static getState = async (gameID, userID) => {
    const hand = await this.getHand(gameID, userID);
    const playCard = await this.getPlayCard(gameID);
    return { user_id: userID, game_id: gameID, hand, playCard };
  };

  static getCard = async (cardID) =>
    db.one(
      `
  SELECT game_deck.id, canonical_cards.value, canonical_cards.color 
  FROM game_deck 
  INNER JOIN canonical_cards 
  ON game_deck.card_id = canonical_cards.id 
  WHERE game_deck.id = $1`,
      [cardID]
    );

  static updateCard = async (cardID, userID) =>
    db.one(`UPDATE game_deck SET user_id = $1 where id = $2 RETURNING *`, [
      userID,
      cardID,
    ]);
}

module.exports = Deck;
