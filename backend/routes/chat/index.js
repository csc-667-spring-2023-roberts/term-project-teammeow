const router = require("express").Router();
const events = require("../../sockets/constants");

router.post("/:id", async (request, response) => {
  const io = request.app.get("io");
  const { message } = request.body;
  const { username, id } = request.session.user;

  const timestamp = "Apr 23";

  // TODO: CHAT messages are not stored

  io.emit(events.CHAT_MESSAGE_RECEIVED, {
    message,
    username,
    timestamp,
  });

  response.status(200);
});

module.exports = router;
