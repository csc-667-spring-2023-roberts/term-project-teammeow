import getGameID from "./getGameId";

const startBtn = document.querySelector("#start-game-btn");

startBtn &&
  startBtn.addEventListener("click", (e) => {
    const gameID = getGameID();

    fetch(`/api/game/start/${gameID}`, { method: "POST" }).then((res) =>
      res.json()
    );
  });
