import io from "socket.io-client";
import events from "../backend/sockets/constants";

const socket = io();
const messageContainer = document.querySelector("#chat #messages");
const messageInput = document.querySelector("#chat input#chatMessage");
const messageSendBtn = document.querySelector("#chat button#send-btn");

socket.on(events.CHAT_MESSAGE_RECEIVED, ({ username, message, timestamp }) => {
  const entry = document.createElement("div");
  const textMessage = document.createElement("div");
  const time = document.createElement("p");
  const sender = document.createElement("p");
  const text = document.createElement("p");

  text.innerHTML = message;
  time.innerHTML = timestamp;
  sender.innerHTML = username;

  entry.setAttribute("class", "text-message");

  textMessage.append(text, time);
  entry.append(sender, textMessage);
  messageContainer.appendChild(entry);
});

messageInput.addEventListener("keydown", (event) => {
  if (event.keyCode !== 13) {
    return;
  }

  const message = event.target.value;
  const url = event.target.getAttribute("data-url");

  event.target.value = "";

  fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
});

messageSendBtn.addEventListener("click", (e) => {
  const message = messageInput.value;
  const url = messageInput.getAttribute("data-url");

  messageInput.value = "";

  fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
});
