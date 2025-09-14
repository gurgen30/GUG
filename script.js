const gridSize = 20;
const totalCells = gridSize * gridSize;
const game = document.getElementById("game");

let snake = [42, 41, 40];
let direction = 1;
let food = 0;
let interval;
let score = 0;

function createGrid() {
  game.innerHTML = '';
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    game.appendChild(cell);
  }
}

function drawSnake() {
  document.querySelectorAll(".cell").forEach((c, i) => {
    c.className = "cell";
    if (snake.includes(i)) c.classList.add("snake");
    if (i === food) c.classList.add("food");
  });
}

function randomFood() {
  let newFood;
  do {
    newFood = Math.floor(Math.random() * totalCells);
  } while (snake.includes(newFood));
  return newFood;
}

function move() {
  const head = snake[0];
  const next = head + direction;

  const hitWall =
    (direction === 1 && head % gridSize === gridSize - 1) ||
    (direction === -1 && head % gridSize === 0) ||
    (direction === gridSize && head >= totalCells - gridSize) ||
    (direction === -gridSize && head < gridSize);

  if (hitWall || snake.includes(next)) {
    document.getElementById("deadSound").play();
    clearInterval(interval);
    alert("Игра окончена!");
    return;
  }

  snake.unshift(next);

  if (next === food) {
    document.getElementById("eatSound").play();
    food = randomFood();
    score++;
    document.getElementById("score").innerText = score;
    if (score > localStorage.getItem("bestScore")) {
      localStorage.setItem("bestScore", score);
      document.getElementById("best").innerText = score;
    }
  } else {
    snake.pop();
  }

  drawSnake();
}

function initGame() {
  snake = [42, 41, 40];
  direction = 1;
  score = 0;
  document.getElementById("score").innerText = score;
  const best = localStorage.getItem("bestScore") || 0;
  document.getElementById("best").innerText = best;
  food = randomFood();
  createGrid();
  drawSnake();
  clearInterval(interval);
  interval = setInterval(move, 150);
}

function changeDirection(dir) {
  if (dir === 'up' && direction !== gridSize) direction = -gridSize;
  else if (dir === 'down' && direction !== -gridSize) direction = gridSize;
  else if (dir === 'left' && direction !== 1) direction = -1;
  else if (dir === 'right' && direction !== -1) direction = 1;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && direction !== gridSize) direction = -gridSize;
  if (e.key === "ArrowDown" && direction !== -gridSize) direction = gridSize;
  if (e.key === "ArrowLeft" && direction !== 1) direction = -1;
  if (e.key === "ArrowRight" && direction !== -1) direction = 1;

  if (e.key === "Enter") {
    initGame();
  }


});

initGame();