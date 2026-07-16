// Game settings
const words = [
    "apple", "smile", "house", "dog", "cat", "book", "tree", 
    "water", "ball", "chair", "cloud", "desk", "door", "fish", 
    "grass", "hat", "juice", "king", "lamp", "mouse", "nest", 
    "ocean", "pen", "queen", "road", "shoe", "table", "voice", 
    "window", "zebra", "cake", "duck", "eggs", "fork", "girl", 
    "horse", "ice", "joke", "kite", "lion", "moon"
];
  
  
let selectedWord = "";
let guessedLetters = new Set();
let wrongAttempts = 0;
let currentWordIndex = 0;
let timer; // Timer variable
let timeRemaining = 300; // 5 minutes in seconds
let score = 0; // Variable to keep track of the score

// DOM Elements
const wordDisplay = document.getElementById("word-display");
const letterButtons = document.getElementById("letter-buttons");
const message = document.getElementById("message");
const canvas = document.getElementById("hangman-canvas");
const ctx = canvas.getContext("2d");
const timerDisplay = document.getElementById("timer-display"); // Timer display element

// Sound effects
const correctSound = new Audio('sounds/correct.mp3');
const incorrectSound = new Audio('sounds/incorrect.mp3');

// Initialize game
function initializeGame() {
    resetGame(); // Call resetGame to set the first word
    startTimer(); // Start the timer
}

// Start the timer
function startTimer() {
    timer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        if (timeRemaining <= 0) {
            clearInterval(timer);
            endGame(); // End the game when time is up
        }
    }, 1000);
}

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDisplay.textContent = `Time Remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Reset game for the next word
function resetGame() {
    if (currentWordIndex >= words.length) {
        message.textContent = "🎮 Game Over! You've used all the words.";
        disableAllButtons();
        endGame();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    selectedWord = words[currentWordIndex];
    currentWordIndex++;
    guessedLetters.clear();
    wrongAttempts = 0;
    message.textContent = "";
    initializeWordDisplay();
    createLetterButtons();
}

// Initialize word display
function initializeWordDisplay() {
    letterButtons.innerHTML = "";
    wordDisplay.textContent = selectedWord
        .split("")
        .map(() => "_")
        .join(" ");
}

// Create letter buttons
function createLetterButtons() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    alphabet.split("").forEach((letter) => {
        const button = document.createElement("button");
        button.textContent = letter;
        button.className = "letter";
        button.addEventListener("click", () => handleGuess(letter, button));
        letterButtons.appendChild(button);
    });
}

// Handle letter guess
function handleGuess(letter, button) {
    button.disabled = true; // Disable button after click

    if (selectedWord.includes(letter)) {
        guessedLetters.add(letter);
        button.style.backgroundColor = "green"; // Correct guess
        correctSound.play(); // Play correct sound
        updateWordDisplay();
        if (checkWin()) {
            score++; // Increment score for a correct word
            message.textContent = "🎉 Correct!"; // Notify correct guess
            disableAllButtons();
            // Move to the next word after a short delay
            setTimeout(() => {
                resetGame(); // Reset for the next word
            }, 2000); // 2 seconds delay before resetting
        }
    } else {
        button.style.backgroundColor = "red"; // Incorrect guess
        incorrectSound.play(); // Play incorrect sound
        wrongAttempts++;
        drawHangmanPart(wrongAttempts);
        if (wrongAttempts >= 10) {
            message.textContent = `💀 Game Over! The word was "${selectedWord}".`;
            disableAllButtons();
            clearInterval(timer); // Stop the timer
            endGame(); // Call endGame to display the final score
        }
    }
}

// Update the displayed word
function updateWordDisplay() {
    const display = selectedWord
        .split("")
        .map((letter) => (guessedLetters.has(letter) ? letter : "_"))
        .join(" ");
    wordDisplay.textContent = display;
}

// Check if player has won
function checkWin() {
    return selectedWord.split("").every((letter) => guessedLetters.has(letter));
}

// Disable all buttons
function disableAllButtons() {
    document.querySelectorAll(".letter").forEach((button) => {
        button.disabled = true;
    });
}

// End the game
function endGame() {
    message.textContent = `⏰ Game Over! Your total score is: ${score}`;
    disableAllButtons();
}


// Draw hangman parts
function drawHangmanPart(attempt) {
    ctx.lineWidth = 2;
    switch (attempt) {
        case 1: // Base
            ctx.beginPath();
            ctx.moveTo(10, 240);
            ctx.lineTo(190, 240);
            ctx.stroke();
            break;
        case 2: // Vertical Pole
            ctx.beginPath();
            ctx.moveTo(50, 240);
            ctx.lineTo(50, 20);
            ctx.stroke();
            break;
        case 3: // Horizontal Pole
            ctx.beginPath();
            ctx.moveTo(50, 20);
            ctx.lineTo(120, 20);
            ctx.stroke();
            break;
        case 4: // Rope
            ctx.beginPath();
            ctx.moveTo(120, 20);
            ctx.lineTo(120, 40);
            ctx.stroke();
            break;
        case 5: // Head
            ctx.beginPath();
            ctx.arc(120, 60, 20, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 6: // Body
            ctx.beginPath();
            ctx.moveTo(120, 80);
            ctx.lineTo(120, 150);
            ctx.stroke();
            break;
        case 7: // Left Arm
            ctx.beginPath();
            ctx.moveTo(120, 100);
            ctx.lineTo(90, 130);
            ctx.stroke();
            break;
        case 8: // Right Arm
            ctx.beginPath();
            ctx.moveTo(120, 100);
            ctx.lineTo(150, 130);
            ctx.stroke();
            break;
        case 9: // Left Leg
            ctx.beginPath();
            ctx.moveTo(120, 150);
            ctx.lineTo(90, 190);
            ctx.stroke();
            break;
        case 10: // Right Leg
            ctx.beginPath();
            ctx.moveTo(120, 150);
            ctx.lineTo(150, 190);
            ctx.stroke();
            break;
    }
}

// Start the game
initializeGame();
