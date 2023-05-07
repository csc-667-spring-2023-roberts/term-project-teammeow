const input = document.querySelector("#chat input#chat-input");
const button = document.querySelector("#chat button#send-btn");

input &&
  input.addEventListener("keydown", ({ target, keyCode }) => {
    if (keyCode !== 13) return;

    const url = target.getAttribute("data-url");
    const message = target.value;

    target.value = "";

    fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
  });

button &&
  button.addEventListener("click", (e) => {
    const url = input.getAttribute("data-url");
    const message = input.value;

    input.value = "";

    fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
  });
