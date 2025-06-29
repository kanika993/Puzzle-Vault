const words = ["javascript", "puzzle", "hangman", "frontend", "developer"];
let selectedWord, guessedLetters, wrongGuesses;
const maxGuesses = 6;
const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");

document.addEventListener("DOMContentLoaded", () => {
    canvas.width = 200;
    canvas.height = 200;
    restartGame();
});

function restartGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongGuesses = 0;

    document.getElementById("message").textContent = "";
    updateWordDisplay();
    createLetterButtons();
    clearCanvas();
}

function createLetterButtons() {
    const letters = "abcdefghijklmnopqrstuvwxyz".split("");
    const gridContainer = document.getElementById("lettersGrid");
    gridContainer.innerHTML = "";

    letters.forEach(letter => {
        let button = document.createElement("button");
        button.textContent = letter;
        button.onclick = () => guessLetter(letter, button);
        gridContainer.appendChild(button);
    });
}

function updateWordDisplay() {
    let display = selectedWord.split("").map(letter => 
        guessedLetters.includes(letter) ? letter : "_"
    ).join(" ");
    document.getElementById("wordDisplay").textContent = display;

    if (!display.includes("_")) {
        document.getElementById("message").textContent = "🎉 You Won!";
    }
}

function guessLetter(letter, button) {
    button.disabled = true;

    if (selectedWord.includes(letter)) {
        guessedLetters.push(letter);
        updateWordDisplay();
    } else {
        wrongGuesses++;
        document.getElementById("message").textContent = `❌ Wrong guesses: ${wrongGuesses}/${maxGuesses}`;
        drawHangmanPart(wrongGuesses);
        
        if (wrongGuesses >= maxGuesses) {
            document.getElementById("message").textContent = `💀 Game Over! The word was "${selectedWord}".`;
        }
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Draw Hangman Parts Based on Wrong Guesses
function drawHangmanPart(stage) {
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    
    switch (stage) {
        case 1: // Base
            ctx.beginPath();
            ctx.moveTo(10, 190);
            ctx.lineTo(190, 190);
            ctx.stroke();
            break;
        case 2: // Stand
            ctx.beginPath();
            ctx.moveTo(50, 190);
            ctx.lineTo(50, 20);
            ctx.lineTo(120, 20);
            ctx.lineTo(120, 40);
            ctx.stroke();
            break;
        case 3: // Head
            ctx.beginPath();
            ctx.arc(120, 55, 15, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 4: // Body
            ctx.beginPath();
            ctx.moveTo(120, 70);
            ctx.lineTo(120, 120);
            ctx.stroke();
            break;
        case 5: // Left Arm
            ctx.beginPath();
            ctx.moveTo(120, 80);
            ctx.lineTo(100, 100);
            ctx.stroke();
            break;
        case 6: // Right Arm (Game Over)
            ctx.beginPath();
            ctx.moveTo(120, 80);
            ctx.lineTo(140, 100);
            ctx.stroke();
            document.getElementById("message").textContent = `💀 Game Over! The word was "${selectedWord}".`;
            break;
    }
}