const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("lobby", { user: req.session.user, title: "Lobby" });
});

module.exports = router;
