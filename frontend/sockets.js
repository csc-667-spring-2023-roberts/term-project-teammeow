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

io.on(`deal:${gameID}:${userID}`, ({ hand, join_order }) => {
  const player = document.querySelector("#player");
  const drawCard = document.querySelector("#draw-card");

  const p = document.createElement("p");
  const div = document.createElement("div");

  const col = div.cloneNode(),
    playerName = div.cloneNode(),
    playerCards = div.cloneNode();

  player.innerHTML = "";
  drawCard.innerHTML = "";

  col.setAttribute("class", "col");
  playerName.setAttribute("class", "player-name");
  playerCards.setAttribute("class", "player-cards row");

  p.append(`Player ${join_order}`);
  playerName.append(p);

  for (const card of hand) {
    playerCards.append(createCard(card));
  }

  col.append(playerName, playerCards);
  player.append(col);

  drawCard.append(createCard({ color: "black", value: "uno", id: 0 }));

  // remove start button

  const startBtn = document.querySelector("#start-game-btn-container");
  startBtn && (startBtn.style.display = "none");
});

io.on(`game-state:${gameID}`, ({ play_card, hands: playerHands }) => {
  const players = document.querySelector("#players");
  const playCard = document.querySelector("#play-card");

  const p = document.createElement("p");
  const div = document.createElement("div");

  players.innerHTML = "";
  playCard.innerHTML = "";

  for (const { user_id, join_order, hands } of playerHands) {
    if (user_id == userID) continue;

    const col = div.cloneNode(),
      playerName = div.cloneNode(),
      playerCards = div.cloneNode();

    col.setAttribute("class", "col");
    playerName.setAttribute("class", "player-name");
    playerCards.setAttribute("class", "player-cards row");

    p.append(`Player ${join_order}`);
    playerName.append(p);

    for (let i = 0; i < parseInt(hands); i++) {
      playerCards.append(createCard({ color: "black", value: "uno", id: 0 }));
    }

    col.append(playerName, playerCards);

    players.append(col);
  }

  playCard.appendChild(createCard(play_card));
});

io.on(`pick-color:${gameID}:${userID}`, ({ wildCards }) => {
  const colorPicker = document.querySelector("#color-picker");

  for (const card of wildCards) {
    const div = document.createElement("div");
    div.setAttribute("class", `${card.color} color-picker`);
    div.setAttribute("data-card-id", card.id);

    colorPicker.append(div);
  }
});
