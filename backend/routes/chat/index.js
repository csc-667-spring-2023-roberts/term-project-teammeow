const router = require("express").Router();
const events = require("../../sockets/constants");

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

router.post("/:id", async (request, response) => {
  const date = new Date();
  const io = request.app.get("io");
  const { message } = request.body;
  const { id: groupID } = request.params;
  const { username } = request.session.user;

  const timestamp = `${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

  // TODO: CHAT messages are not stored

  io.emit(events.CHAT_MESSAGE_RECEIVED + `:${groupID}`, {
    message,
    username,
    timestamp,
  });

  response.status(200);
});

module.exports = router;
