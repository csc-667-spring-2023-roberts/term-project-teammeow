const router = require("express").Router();
const Games = require("../../db/games");

router.get("/:id", (req, res) => {
  // TODO
  // check if room not full
  // if full redirect to lobby
  // else join game

  res.render("game", { id: req.params.id, title: "Game" });
});

router.post("/create", async (req, res) => {
  const { roomTitle, players } = req.body;
  const {
    user: { id: userID },
  } = req.session;

  try {
    if (roomTitle.length > 0 && parseInt(players) > 0) {
      const game = await Games.create(userID, players, roomTitle);

      res.redirect(`/game/${game.id}`);
    }
  } catch (err) {}

  res.redirect("/lobby");
});

module.exports = router;
