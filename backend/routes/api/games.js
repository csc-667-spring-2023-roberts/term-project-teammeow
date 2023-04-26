const express = require("express");
const router = express.Router();
const Games = require("../../db/games.js");

router.post("/create", async (req, res) => {
  console.log("hit create");
  // const { id: user_id } = req.session.user;
  const user_id = 1;
  const io = req.app.get("io");
  console.log(req.body);
  const { players, room_title } = req.body;
  try {
    const { id: gameID, created_at: createdAt } = await Games.create(
      user_id,
      players,
      room_title
    );
    console.log("game created");
    io.emit("game:created", { gameID, createdAt });
    res.redirect(`/games/${gameID}`);
  } catch (err) {
    console.log(err);
    res.redirect("/lobby");
  }
});

module.exports = router;
