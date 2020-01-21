function rockPaperScissors(user, com) {
  user = user.toLowerCase();
  com = com.toLowerCase();

  if (user == com) {
    return [0, "Draw!"];
  }

  if (user == "rock") {
    if (com == "paper") {
      return [-1, "You lose! Paper beats Rock"];
    } else {
      return [1, "You win! Rock beats Scissors"];
    }
  } else if (user == "paper") {
    if (com == "rock") {
      return [1, "You win! Paper beats Rock"];
    } else {
      return [-1, "Yoo lose! Scissors beats Paper"];
    }
  } else {
    if (com == "rock") {
      return [-1, "You lose! Rock beats Scissors"];
    } else {
      return [1, "Yoo win! Scissors beats Paper"];
    }
  }
}

function computerPlay() {
  let idx = Math.floor(Math.random() * 3);
  switch (idx) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    case 2:
      return "scissors";
  }
}

function display(message) {
  div = document.querySelector("#output-log");
  p = document.createElement("p");
  p.textContent = message;
  div.appendChild(p);
}

function game(player) {
  if (metadata["gameFinished"]) {
    return;
  } else if (metadata["playerScore"] == 5 || metadata["comScore"] == 5) {
    var gameOutcome;
    if (metadata["playerScore"] > metadata["comScore"]) {
      gameOutcome = "You win overall!";
    } else if (metadata["playerScore"] < metadata["comScore"]) {
      gameOutcome = "You lose overall!";
    } else {
      gameOutcome = "Draw overall!";
    }

    display(gameOutcome);
    metadata["gameFinished"] = true;
  } else {
    [result, message] = rockPaperScissors(player, computerPlay());
    metadata["round"] += 1;

    if (result > 0) {
      metadata["playerScore"] += 1;
    } else if (result < 0) {
      metadata["comScore"] += 1;
    }

    display(
      `Round ${metadata["round"]} - Player-Score: ${metadata["playerScore"]} - Com-Score ${metadata["comScore"]}`
    );
    display(message);
  }
}

const buttons = document.querySelectorAll(".special-button");

var metadata = {
  round: 0,
  playerScore: 0,
  comScore: 0,
  gameFinished: false
};

buttons.forEach(button => {
  button.addEventListener("click", e => {
    game(button.id, metadata);
  });
});
