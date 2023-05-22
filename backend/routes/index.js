const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const gameRoutes = require("./game");
const chatRoutes = require("./chat");
const lobbyRoutes = require("./lobby");
const gameAPIRoutes = require("./api/games");

const { isAuthenticated } = require("../middleware");

router.get("/", isAuthenticated, (req, res) => {
  res.redirect("/lobby");
});

router.use("/auth", authRoutes);
router.use(isAuthenticated);
router.use("/game", gameRoutes);
router.use("/chat", chatRoutes);
router.use("/lobby", lobbyRoutes);
router.use("/api/game", gameAPIRoutes);

module.exports = router;
