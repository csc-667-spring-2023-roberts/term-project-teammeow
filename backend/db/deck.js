const db = require("./connection");
class Deck {
  static create = async (gameID) => {
    await db.none("DELETE FROM game_deck WHERE game_id = $1", [gameID]);
    //create deck of 108 cards
    for (var i = 1; i <= 62; i++) {
      //2 x 1-9, skip, +2, reverse for each color
      let k = 2;
      //1 x 0 for each color
      //1 x wild and +4 of each color to play when player selects a color from playing a wild
      if (i == 1 || i == 14 || i == 27 || i == 40 || i > 54) {
        k = 1;
      }
      if ((i == 53) | (i == 54)) {
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
      "SELECT id FROM game_deck WHERE game_id = $1 AND user_id = 0 AND card_id < 55 ORDER BY random() limit 1",
      [gameID]
    );
    db.none("UPDATE game_deck SET user_id = -2 WHERE id = $1", [cardID]);
  };

  static dealCards = async (gameID, userID, numCards) => {
    for (let i = 0; i < numCards; i++) {
      var { id: cardID } = await db.one(
        "SELECT id FROM game_deck WHERE game_id = $1 AND user_id = 0 AND card_id < 55 ORDER BY random() limit 1",
        [gameID]
      );
      await db.any(
        "UPDATE game_deck SET user_id = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2",
        [userID, cardID]
      );
    }
  };

  static drawCard = async (gameID, userID) => {
    const { id } = await db.one(
      `
        UPDATE game_deck 
        SET updated_at = CURRENT_TIMESTAMP, user_id = $1
        WHERE id = (
          SELECT id FROM game_deck 
          WHERE game_id = $2 AND user_id = 0 AND card_id < 55 
          ORDER BY random() limit 1
        ) RETURNING *
      `,
      [userID, gameID]
    );

    return await this.getCard(id);
  };

  static getHand = async (gameID, userID) =>
    await db.many(
      `
        SELECT game_deck.id, canonical_cards.value, canonical_cards.color 
        FROM game_deck 
        INNER JOIN canonical_cards 
        ON game_deck.card_id = canonical_cards.id 
        WHERE game_id = $1 AND user_id = $2
        ORDER BY game_deck.updated_at
      `,
      [gameID, userID]
    );

  static getNumCardsInHand = async (gameID) =>
    await db.many(
      `
        SELECT gd.user_id, COUNT(gd.card_id) as hands, gp.join_order FROM game_deck gd 
        INNER JOIN game_players gp ON gd.user_id = gp.user_id 
        WHERE gd.game_id = $1
        GROUP BY gd.user_id, gp.join_order
      `,
      [gameID]
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

  static getWildCards = async (gameID, value) =>
    db.many(
      `
        SELECT gd.id, c.value, c.color 
        FROM game_deck gd 
        LEFT JOIN canonical_cards c 
        ON gd.card_id=c.id 
        WHERE card_id > 54 AND game_id = $1 and value = $2;
      `,
      [gameID, value]
    );

  static updateCard = async (cardID, userID) =>
    db.one(`UPDATE game_deck SET user_id = $1 where id = $2 RETURNING *`, [
      userID,
      cardID,
    ]);
}

module.exports = Deck;
