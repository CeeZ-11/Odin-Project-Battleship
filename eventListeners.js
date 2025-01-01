import { GameController } from "./index.js";

export function addStartButtonListener() {
  const button = document.getElementById("start");
  if (button) {
    button.addEventListener("click", () => {
      const game = GameController();
    });
  }
}

/* export function addFormSubmitListener(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const inputX = form.querySelector("#attack-x");
      const inputY = form.querySelector("#attack-y");
      const x = parseInt(inputX.value, 10);
      const y = parseInt(inputY.value, 10);
      const game = GameController();

      if (isNaN(x) || isNaN(y) || inputX.value === "" || inputY.value === "") {
        alert("Invalid input. Please enter a number between 0 and 9.");
        return;
      } else if (x < 0 || x > 9 || y < 0 || y > 9) {
        alert("Invalid input. Please enter a number between 0 and 9.");
        return;
      } else {
        game.playerTurn(x, y);
        game.displayShipHitCounts();
        form.reset();
        inputX.focus();
        inputX.select();
      }
    });
  }
} */
