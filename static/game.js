let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
let game_number = 0;
let games_won_by_x = 0;
let games_won_by_o = 0;
let draws = 0;
let score = 0;

let player = "";

const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset');
const dbButton = document.getElementById('save_to_db');

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

function calculateScore() {
    score = 10*games_won_by_x - 10*games_won_by_o;
}

function getPlayerName(){
    player = document.getElementById("name").value;
}

function sendData() {
    getPlayerName();
    calculateScore();
    window.location.href = "results.html?player=" + player + "&score=" + score.toString();
}

function updateResults(){
    document.getElementById("games_played").innerHTML = `Number of games played: ${game_number}`;
    document.getElementById("games_won_by_x").innerHTML = `Number of games won by X: ${games_won_by_x}`;
    document.getElementById("games_won_by_o").innerHTML = `Number of games won by O: ${games_won_by_o}`;
    document.getElementById("draws").innerHTML = `Draws: ${draws}`;
}

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || isGameActive === false || currentPlayer === 'O') return;

    board[index] = 'X';
    cell.textContent = 'X';

    checkResult();

    if (isGameActive) {
        currentPlayer = 'O'; // CPU's turn
        setTimeout(cpuMove, 500); // Let CPU make a move after some delay
    }
}

function cpuMove() {
    let result=Math.floor(Math.random()*9);
    while(board[result] !== ""){
        result=Math.floor(Math.random()*9);
    }
    board[result] = 'O';
    document.querySelector(`.cell[data-index='${result}']`).textContent = 'O';
    
    checkResult();

    if (isGameActive) {
        currentPlayer = 'X'; // Switch back to player
    }
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.innerHTML = currentPlayer;
}

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
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    messageElement.innerHTML = "";
    cells.forEach(cell => (cell.innerHTML = ""));
    cells.forEach(node => {node.style.color = "#333";})
    if (game_number%2 === 0) {
        currentPlayer = "X";
    }
    else {
        currentPlayer = "O";
        setTimeout(cpuMove, 500);
    }
}

dbButton.addEventListener('click', sendData);
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
