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

  static dealCards = async (gameID, userID, numCards) => {
    for (let i = 0; i < numCards; i++) {
      var { id: cardID } = await db.one(
        "SELECT id FROM game_deck WHERE game_id = $1 AND user_id = 0 ORDER BY random() limit 1",
        [gameID]
      );
      await db.any(
        "UPDATE game_deck SET user_id = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2",
        [userID, cardID]
      );
    }
  };

  static dealCard = async (gameID, userID) => {
    var { id: cardID } = await db.one(
      "SELECT id FROM game_deck WHERE game_id = $1 AND user_id = 0 ORDER BY random() limit 1",
      [gameID]
    );
    return await db.one(
      "UPDATE game_deck SET user_id = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
      [userID, cardID]
    );
  };

  static getHand = async (gameID, userID) =>
    await db.many(
      `
        SELECT game_deck.id, canonical_cards.value, canonical_cards.color 
        FROM game_deck 
        INNER JOIN canonical_cards 
        ON game_deck.card_id = canonical_cards.id 
        WHERE game_id = $1 AND user_id = $2
      `,
      [gameID, userID]
    );

  static getNumCardsInHand = async (gameID, userID) =>
    await db.many(
      `
        SELECT gd.user_id, COUNT(gd.card_id) as hands FROM game_deck gd 
        INNER JOIN game_players gp ON gd.user_id = gp.user_id 
        WHERE gd.game_id = $1 and gd.user_id <> $2 
        GROUP BY gd.user_id
      `,
      [gameID, userID]
    );

  static getPlayCard = (gameID) =>
    db.one(
      `
        SELECT game_deck.id, canonical_cards.value, canonical_cards.color 
        FROM game_deck 
        INNER JOIN canonical_cards 
        ON game_deck.card_id = canonical_cards.id 
        WHERE game_id = $1 AND user_id = -2
      `,
      [gameID]
    );

  static getCard = async (cardID) =>
    db.one(
      `
        SELECT game_deck.id, canonical_cards.value, canonical_cards.color 
        FROM game_deck 
        INNER JOIN canonical_cards 
        ON game_deck.card_id = canonical_cards.id 
        WHERE game_deck.id = $1
      `,
      [cardID]
    );

  static updateCard = async (cardID, userID) =>
    db.one(`UPDATE game_deck SET user_id = $1 where id = $2 RETURNING *`, [
      userID,
      cardID,
    ]);
}

module.exports = Deck;
