let currentMoleTile;
let currentPlantTile;
let score = 0;
let gameOver = false;
let timer = 60;
let timerInterval;
let moleInterval;
let plantInterval;

window.onload = function () {
    setGame();
}

function setGame() {
    // GRID SET UP
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        document.getElementById("board").appendChild(tile);
        tile.addEventListener("click", selectTile);
    }
   
    startTimer();
    moleInterval = setInterval(setMole, 1000);
    plantInterval = setInterval(setPlant, 2000);
}

function startTimer() {
    timerInterval = setInterval(function () {
        if (gameOver) return;
        timer--;
        document.getElementById("timer").innerText = "Time: " + timer;
        if (timer <= 0) {
            endGame();
        }
    }, 1000);
}

function setMole() {
    if (gameOver) return;
    if (currentMoleTile) {
        currentMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";
    let num = getRandomTile();
    if (currentPlantTile && currentPlantTile.id == num) {
        return;
    }
    currentMoleTile = document.getElementById(num);
    currentMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) return;
    if (currentPlantTile) {
        currentPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";
    let num = getRandomTile();
    if (currentMoleTile && currentMoleTile.id == num) {
        return;
    }
    currentPlantTile = document.getElementById(num);
    currentPlantTile.appendChild(plant);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function selectTile() {
    if (gameOver) return;
    if (this == currentMoleTile) {
        score += 10;
        document.getElementById("score").innerText = "Score: " + score;
    } else if (this == currentPlantTile) {
        endGame();
    }
}

function endGame() {
    gameOver = true;
    clearInterval(timerInterval);
    clearInterval(moleInterval);
    clearInterval(plantInterval);
    document.getElementById("score").innerText = "GAME OVER! Score: " + score;
    document.getElementById("restartButton").style.display = "block"; // Show restart button
}

function restartGame() {
    // Reset game state
    gameOver = false;
    score = 0;
    timer = 60;
    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("timer").innerText = "Time: " + timer;
    document.getElementById("restartButton").style.display = "none"; // Hide restart button

    // Clear and restart intervals
    clearInterval(timerInterval);
    clearInterval(moleInterval);
    clearInterval(plantInterval);

    // Reset grid
    document.getElementById("board").innerHTML = "";

    setGame(); // Reinitialize the game
    startTimer(); // Restart the timer
}
