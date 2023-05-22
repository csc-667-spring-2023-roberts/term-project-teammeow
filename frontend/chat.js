import getGameID from "./getGameId";

const input = document.querySelector("#chat input#chat-input");
const button = document.querySelector("#chat button#send-btn");

input &&
  input.addEventListener("keydown", ({ target, keyCode }) => {
    if (keyCode !== 13) return;

    const gameID = getGameID();
    const message = target.value;

    if (message.length == 0) return;

    target.value = "";

    fetch(`/chat/${gameID}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
  });

button &&
  button.addEventListener("click", (e) => {
    const gameID = getGameID();
    const message = input.value;

    if (message.length == 0) return;

    input.value = "";

    fetch(`/chat/${gameID}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
  });
