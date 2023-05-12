import socket from "socket.io-client";
import getGameID from "./getGameId";
import getUserID from "./getUserId";
import createCard from "./createCard";
import { CHAT_MESSAGE_RECEIVED } from "../backend/sockets/constants";

const io = socket();
const gameID = getGameID();
const userID = getUserID();

const messageDiv = document.querySelector("#chat #messages");

io.on(
  CHAT_MESSAGE_RECEIVED + `:${gameID}`,
  ({ username, message, timestamp }) => {
    const div = document.createElement("div");
    const textDiv = document.createElement("div");

    const time = document.createElement("p");
    const text = document.createElement("p");
    const sender = document.createElement("p");

    text.innerHTML = message;
    time.innerHTML = timestamp;
    sender.innerHTML = username;

    div.setAttribute("class", "text-message");

    textDiv.append(text, time);
    div.append(sender, textDiv);
    messageDiv.appendChild(div);
  }
);

io.on(`deal:${gameID}:${userID}`, ({ hands }) => {
  const cardsDiv = document.querySelector("#cards");

  for (const { value, color } of hands) {
    const card = createCard(value, color);
    cardsDiv.append(card);
  }
});
