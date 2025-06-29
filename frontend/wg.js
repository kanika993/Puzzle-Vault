const puzzleContainer = document.getElementById("puzzle-container");
const lettersContainer = document.getElementById("letters-container");

const validWords = ["bat", "cat", "hat", "mat", "sat", "dog", "log", "fog", "frog", "clock"];
let currentWord = "";

// Generate Random Blanks
function generatePuzzle() {
    puzzleContainer.innerHTML = "";
    let word = validWords[Math.floor(Math.random() * validWords.length)];
    currentWord = "";
    
    word.split("").forEach(() => {
        let blankElement = document.createElement("span");
        blankElement.classList.add("blank");
        blankElement.textContent = "_";
        puzzleContainer.appendChild(blankElement);
    });

    generateLetters();
}

function generateLetters() {
    lettersContainer.innerHTML = "";
    const letters = "abcdefghijklmnopqrstuvwxyz".split("");
    letters.forEach(letter => {
        let letterElement = document.createElement("span");
        letterElement.classList.add("letter");
        letterElement.textContent = letter;
        letterElement.onclick = () => selectLetter(letter);
        lettersContainer.appendChild(letterElement);
    });
}

function selectLetter(letter) {
    let blanks = document.querySelectorAll(".blank");
    if (currentWord.length < blanks.length) {
        currentWord += letter;
        blanks[currentWord.length - 1].textContent = letter;
        
        if (currentWord.length === blanks.length) {
            checkWin();
        }
    }
}

function checkWin() {
    if (validWords.includes(currentWord)) {
        alert("🎉 Correct! You formed a valid word!");
    } else {
        alert("❌ Incorrect! Try again!");
        restartGame();
    }
}

function restartGame() {
    generatePuzzle();
}

// Start Game
generatePuzzle();