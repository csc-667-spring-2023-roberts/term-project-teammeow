const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const gameRoutes = require("./game");
const chatRoutes = require("./chat");
const lobbyRoutes = require("./lobby");
const gameAPIRoutes = require("./api/games");

const { isAuthenticated, isAuthenticatedRedirect } = require("../middleware");

router.get("/", isAuthenticated, (request, response) => {
  response.render("home", {
    title: "Hi World!",
    message: "Our first template.",
  });
});

router.use("/auth", authRoutes);
router.use(isAuthenticatedRedirect);
router.use("/game", gameRoutes);
router.use("/api/game", gameAPIRoutes);
router.use("/chat", chatRoutes);
router.use("/lobby", lobbyRoutes);

module.exports = router;
