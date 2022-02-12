// main.js
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;
const size = width / 10;

let score = 0;
const scoreText = document.getElementById('scoreText');

const playerImage = new Image();
playerImage.src = '/images/character-down.png';
const treasureImage = new Image();
treasureImage.src = '/images/treasure.png';

// Iteration 2
class Character {
  constructor(col, row) {
    this.col = col;
    this.row = row;
  }
  moveUp() {
    this.row--;
  }
  moveRight() {
    this.col++;
  }
  moveDown() {
    this.row++;
  }
  moveLeft() {
    this.col--;
  }
}
// Iteration 4
class Treasure {
  constructor(max) {
    this.maxX = max;
    this.maxY = max;
  }

  setRandomPosition() {
    this.col = Math.floor(Math.random() * this.maxX);
    this.row = Math.floor(Math.random() * this.maxY);
  }
}

const player = new Character(0, 0);
const treasure = new Treasure(10);

function drawTreasure(col, row) {
  context.drawImage(
    treasureImage,
    treasure.col * size,
    treasure.row * size,
    25,
    25
  );
}

treasure.setRandomPosition();
drawTreasure();

// Iteration 1
function drawGrid(w, h) {
  context.canvas.width = w;
  context.canvas.height = h;

  for (x = 0; x <= w; x += 50) {
    context.moveTo(x, 0);
    context.lineTo(x, h);
    for (y = 0; y <= h; y += 50) {
      context.moveTo(0, y);
      context.lineTo(w, y);
    }
  }
  context.stroke();
}

function drawPlayer() {
  context.drawImage(playerImage, player.col * size, player.row * size, 25, 25);
}

// React based on the key pressed
function playerMovement(key) {
  switch (key) {
    case 'ArrowLeft':
      player.moveLeft();
      break;
    case 'ArrowRight':
      player.moveRight();
      break;
    case 'ArrowDown':
      player.moveDown();
      break;
    case 'ArrowUp':
      player.moveUp();
      break;
  }

  if (player.col === treasure.col && player.row === treasure.row) {
    treasure.setRandomPosition();
    drawTreasure();
    score++;
    console.log(scoreText);
    // scoreText.innerText = score;
  }
}
playerMovement();

function drawEverything() {
  drawGrid(500, 500);
  drawPlayer();
  drawTreasure(50 * 2, 50 * 4);
}

// Check for keys
document.onkeydown = (e) => {
  playerMovement(e.key);
  drawEverything();
};

// When the page load, the first drawEveryThing will be executed after 1000ms to ensure images get loaded.
setTimeout(() => drawEverything(), 1000);
