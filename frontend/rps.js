const choices = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️"
};

let winCount = 0;
let loseCount = 0;
let drawCount = 0;

function playGame(playerChoice) {
    let computerChoice = Object.keys(choices)[Math.floor(Math.random() * 3)];

    document.getElementById("playerChoice").textContent = choices[playerChoice];
    document.getElementById("computerChoice").textContent = choices[computerChoice];

    let result = determineWinner(playerChoice, computerChoice);
    
    updateScoreboard(result);
}

function determineWinner(player, computer) {
    if (player === computer) {
        return "draw";
    }

    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return "win";
    }

    return "lose";
}

function updateScoreboard(result) {
    if (result === "win") {
        winCount++;
    } else if (result === "lose") {
        loseCount++;
    } else {
        drawCount++;
    }

    document.getElementById("winCount").textContent = winCount;
    document.getElementById("loseCount").textContent = loseCount;
    document.getElementById("drawCount").textContent = drawCount;
}