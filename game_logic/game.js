// script.js
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
let game_number = 0;
let games_won_by_x = 0;
let games_won_by_o = 0;
let draws = 0;

const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset');

// Winning combinations (rows, columns, diagonals)
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function cpuAI() {
    
}

function updateResults(){
    document.getElementById("games_played").innerHTML = `Number of games played: ${game_number}`;
    document.getElementById("games_won_by_x").innerHTML = `Number of games won by X: ${games_won_by_x}`;
    document.getElementById("games_won_by_o").innerHTML = `Number of games won by O: ${games_won_by_o}`;
    document.getElementById("draws").innerHTML = `Draws: ${draws}`;
}

// Handle cell click
function handleCellClick(event) {
    const clickedCellIndex = event.target.getAttribute('data-index');

    if (board[clickedCellIndex] !== "" || !isGameActive) {
        return; // If the cell is already filled or game is over, ignore the click
    }
    updateCell(event.target, clickedCellIndex);
    checkResult();
}

function updateCell(index) {
    var id = "c" + index
    document.getElementById(id).innerHTML("O");
}

// Update the clicked cell and the game state
function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.innerHTML = currentPlayer;
}

// Check if a player has won or if it's a draw
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }

        if (a === b && b === c) {
            cells.forEach(node => {node.style.color = "grey";})
            cells[winCondition[0]].style.color = "red";
            cells[winCondition[1]].style.color = "red";
            cells[winCondition[2]].style.color = "red";
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        if(currentPlayer == "X") {
            ++games_won_by_x;
        }
        else {
            ++games_won_by_o;
        }
        messageElement.innerHTML = `${currentPlayer} wins!`;
        isGameActive = false;
        ++game_number;
        updateResults();
        return;
    }

    // Check for a draw
    if (!board.includes("")) {
        ++draws;
        ++game_number;
        messageElement.innerHTML = "It's a draw!";
        isGameActive = false;
        updateResults();
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Reset the game board
function resetGame() {
    if (game_number === 4) {
        game_number = 0;
        draws = 0;
        games_won_by_o = 0;
        games_won_by_x = 0;
        updateResults();
    }
    board = ["", "", "", "", "", "", "", "", ""];
    if (game_number%2 === 0) {
        currentPlayer = "X";
    }
    else {
        currentPlayer = "O";
    }
    isGameActive = true;
    messageElement.innerHTML = "";
    cells.forEach(cell => (cell.innerHTML = ""));
    cells.forEach(node => {node.style.color = "#333";})
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
