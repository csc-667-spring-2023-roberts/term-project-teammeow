import getGameID from "./getGameId";

const cards = document.querySelector("#cards");
const startBtn = document.querySelector("#start-game-btn");

startBtn &&
  startBtn.addEventListener("click", (e) => {
    const gameID = getGameID();

    fetch(`/api/game/start/${gameID}`, { method: "POST" }).then((res) =>
      res.json()
    );
  });

cards &&
  cards.addEventListener("click", (e) => {
    const gameID = getGameID();
    const id = e.target.getAttribute("data-card-id");

    fetch(`/api/game/move/${gameID}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  });
