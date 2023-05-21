import getGameID from "./getGameId";

const player = document.querySelector("#player");
const drawCard = document.querySelector("#draw-card");
const startBtn = document.querySelector("#start-game-btn");
const colorPicker = document.querySelector("#color-picker");

startBtn &&
  startBtn.addEventListener("click", (e) => {
    const gameID = getGameID();

    fetch(`/api/game/start/${gameID}`, { method: "POST" }).then((res) =>
      res.json()
    );
  });

player &&
  player.addEventListener("click", (e) => {
    const gameID = getGameID();
    const id = e.target.getAttribute("data-card-id");

    fetch(`/api/game/move/${gameID}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  });

drawCard &&
  drawCard.addEventListener("click", (e) => {
    const gameID = getGameID();

    fetch(`/api/game/draw/${gameID}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
    });
  });

colorPicker &&
  colorPicker.addEventListener("click", (e) => {
    const id = e.target.getAttribute("data-card-id");
    const gameID = getGameID();

    fetch(`/api/game/move/${gameID}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    colorPicker.innerHTML = "";
  });
