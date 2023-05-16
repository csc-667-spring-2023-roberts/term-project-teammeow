const router = require("express").Router();

const { Games } = require("../../db");

router.get("/:id", async (req, res) => {
  const { id: gameID } = req.params;
  const { id: userID } = req.session.user;

  const userJoined = await Games.isJoined(gameID, userID);

  if (userJoined) {
    res.render("game", { title: "Game" });
  } else {
    res.redirect("/lobby");
  }
});

module.exports = router;
