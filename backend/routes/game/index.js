const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
  res.render("game", { id: req.params.id, title: "Game" });
});

module.exports = router;
