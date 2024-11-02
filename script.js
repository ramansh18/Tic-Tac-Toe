const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");
const startBtn = document.querySelector(".start-btn");
const playerOne = document.getElementById("pyr-1");
const playerTwo = document.getElementById("pyr-2");
const startScreen = document.querySelector(".start-screen");
const secondStartScreen = document.querySelector(".second-start-screen");
const TTT = document.querySelector(".tic-tac-toe");
const formData = document.querySelector("form");
const name_error = document.querySelector("#name-error");
const name_error1 = document.querySelector("#name-error1");
const selectingScreen = document.querySelector(".selecting-screen");
const PvComp_btn = document.querySelector("#player-vs-computer-btn");
const PvP_btn = document.querySelector("#player-vs-player-btn");

let currentPlayer, isComputerOpponent;
let gameGrid;
const winningPos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Initial UI state
TTT.classList.add("hidden");
gameInfo.classList.add("hidden");
secondStartScreen.classList.add("hidden");

// Event Listeners
PvComp_btn.addEventListener("click", () => selectMode(true));
PvP_btn.addEventListener("click", () => selectMode(false));
formData.addEventListener("submit", e => {
    e.preventDefault();
    console.log("Form submitted"); // Debugging line
    if (isValidate()) {
        ClickHandler();
    }
});
newGamebtn.addEventListener("click", NewGame);

// Select game mode
function selectMode(isComputer) {
    isComputerOpponent = isComputer;
    playerTwo.value = isComputer ? "AI" : "";
    playerTwo.disabled = isComputer;
    secondStartScreen.classList.remove("hidden");
    selectingScreen.classList.add("hidden");

    // Reset error messages when mode is selected
    name_error.innerText = "";
    name_error1.innerText = "";
}

// Validate player names
function isValidate() {
    // Clear previous error message
    name_error.innerText = "";

    // Check Player One's name
    if (playerOne.value.trim() === "") {
        name_error.innerText = "Name cannot be empty";
        return false;
    }

    // Check Player Two's name if in PvP mode
    if (!isComputerOpponent && playerTwo.value.trim() === "") {
        name_error.innerText = "Name cannot be empty";
        return false;
    }

    return true;
}

// Start the game
function ClickHandler() {
    TTT.classList.remove("hidden");
    startScreen.classList.add("hidden");
    gameInfo.classList.remove("hidden");
    document.querySelector("h1").classList.add("hidden");
    initGame();
}

// Reset the game
function NewGame() {
    TTT.classList.add("hidden");
    startScreen.classList.remove("hidden");
    playerOne.value = "";
    playerTwo.value = "";
    gameInfo.classList.add("hidden");
    newGamebtn.classList.remove("active");
    selectingScreen.classList.remove("hidden");
    secondStartScreen.classList.add("hidden");
    document.querySelector("h1").classList.remove("hidden"); // Show game mode selection again
}

// Initialize the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerHTML = ""; // Clear box content
        boxes[index].style.pointerEvents = "all"; // Make boxes clickable
        box.classList = `box box${index + 1}`;
    });
    gameInfo.innerText = `Current Player - ${playerOne.value}`;
}

// Function to swap turns
function swapTurn() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    gameInfo.innerText = `Current Player - ${(currentPlayer === "X") ? playerOne.value : playerTwo.value || "AI"}`;
}

// Function to check if the game is over
function checkGameOver() {
    let winner = "";
    winningPos.forEach((position) => {
        if (
            gameGrid[position[0]] !== "" &&
            gameGrid[position[0]] === gameGrid[position[1]] &&
            gameGrid[position[1]] === gameGrid[position[2]]
        ) {
            winner = gameGrid[position[0]];
            // Highlight winning boxes
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if (winner !== "") {
        gameInfo.innerHTML = `Winner - ${(winner === "X") ? playerOne.value : playerTwo.value}`;
        newGamebtn.classList.add("active");
        disableAllBoxes();
        return true;
    }

    // Check for a tie if all boxes are filled and no winner
    if (!gameGrid.includes("")) {
        gameInfo.innerHTML = "Game Tied!";
        newGamebtn.classList.add("active");
        disableAllBoxes();
        return true;
    }
    return false;
}

// Function to disable all boxes
function disableAllBoxes() {
    boxes.forEach((box) => {
        box.style.pointerEvents = "none";
    });
}

// Function to handle box click
function handleClick(index) {
    if (gameGrid[index] === "") {
        // Player's turn in PvP mode or when it's Player X's turn in PvC mode
        if (!isComputerOpponent || currentPlayer === "X") {
            boxes[index].innerHTML = (currentPlayer === "X") ?
                '<img src="./assets/cross.png" alt="X" height="70" width="70">' :
                '<img src="./assets/circle.png" alt="O" height="70" width="70">';
            gameGrid[index] = currentPlayer;
            boxes[index].style.pointerEvents = "none";
            
            // Check for game over or switch turn
            if (!checkGameOver()) {
                swapTurn();
                if (isComputerOpponent && currentPlayer === "O") {
                    computerMove();  // Trigger computer's move
                }
            }
        }
    }
}

// Function to handle computer's move
function computerMove() {
    const randomDelay = Math.floor(Math.random() * 500) + 500; // Random delay between 500 and 1000 ms

    setTimeout(() => {
        const bestMove = getBestMove();
        if (bestMove !== null) {
            boxes[bestMove].innerHTML = '<img src="./assets/circle.png" alt="O" height="70" width="70">';
            gameGrid[bestMove] = "O";
            boxes[bestMove].style.pointerEvents = "none";
            if (!checkGameOver()) {
                swapTurn();
            }
        }
    }, randomDelay); 
}

// Function to get the best move for the computer
function getBestMove() {
    let bestScore = -Infinity;
    let move = null;
    gameGrid.forEach((cell, index) => {
        if (cell === "") {
            gameGrid[index] = "O";
            let score = minimax(gameGrid, 0, false);
            gameGrid[index] = "";
            if (score > bestScore) {
                bestScore = score;
                move = index;
            }
        }
    });
    return move;
}

// Minimax algorithm implementation
function minimax(grid, depth, isMaximizing) {
    if (checkWinner("O")) return 10 - depth;
    if (checkWinner("X")) return depth - 10;
    if (!grid.includes("")) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        grid.forEach((cell, index) => {
            if (cell === "") {
                grid[index] = "O";
                let score = minimax(grid, depth + 1, false);
                grid[index] = "";
                bestScore = Math.max(score, bestScore);
            }
        });
        return bestScore;
    } else {
        let bestScore = Infinity;
        grid.forEach((cell, index) => {
            if (cell === "") {
                grid[index] = "X";
                let score = minimax(grid, depth + 1, true);
                grid[index] = "";
                bestScore = Math.min(score, bestScore);
            }
        });
        return bestScore;
    }
}

// Function to check if there's a winner
function checkWinner(player) {
    return winningPos.some((position) => {
        return position.every((index) => gameGrid[index] === player);
    });
}

// Adding click event listeners to boxes
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

// Event listener for new game button
newGamebtn.addEventListener("click", NewGame);
