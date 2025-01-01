import { GameController } from "./index.js";

export function addStartButtonListener() {
  const button = document.getElementById("start");
  if (button) {
    button.addEventListener("click", () => {
      const game = GameController();
      game.initializer();
    });
  }
}

export function addFormSubmitListener(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const inputX = form.querySelector("#attack-x");
      const inputY = form.querySelector("#attack-y");
      const x = parseInt(inputX.value, 10);
      const y = parseInt(inputY.value, 10);
      const game = GameController();
      game.playerTurn(x, y);
    });
  }
}
