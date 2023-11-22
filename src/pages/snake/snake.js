let playGround = document.getElementById("playGround");
let width = playGround.offsetWidth - 2;
let height = playGround.offsetHeight - 2;
var ctx = playGround.getContext("2d");
let speed = 100;
let amountOfFood = 2;
let actuellyFood = 0;
let size = 20;
let disbaled = false;
let positions = [{ x: 20, y: 20 }];
let food = [{ x: 100, y: 200 }];
let direction = "right";
let isPaused = false;
let highScore = 0;
let time = 0;
let timeRead = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let isEnd = false;
document.addEventListener("keydown", (event) => {
  const keyName = event.key.toLowerCase();
  if (!disbaled) {
    switch (keyName) {
      case "arrowright":
      case "d":
        if (direction !== "left") {
          direction = "right";
          setDisabled();
        }
        break;
      case "arrowdown":
      case "s":
        if (direction !== "up") {
          direction = "down";
          setDisabled();
        }
        break;
      case "arrowleft":
      case "a":
        if (direction !== "right") {
          direction = "left";
          setDisabled();
        }
        break;
      case "arrowup":
      case "w":
        if (direction !== "down") {
          direction = "up";
          setDisabled();
        }
        break;
    }
  }
});
async function start() {
  startTimer();
  while (!isEnd) {
    checkCollision();
    if (!isEnd) {
      checkFood();
      generateFood();
      updateButton();
      if (!isEnd) {
        if (!isPaused) {
          for (let i = 0; i < positions.length; i++) {
            ctx.beginPath();
            ctx.rect(positions[i].x, positions[i].y, size, size);
            ctx.fillStyle = "green";
            ctx.fill();
          }
          await delay(speed);
          ctx.clearRect(positions[0].x, positions[0].y, size, size);
          for (let i = 0; i < positions.length - 1; i++) {
            positions[i].x = positions[i + 1].x;
            positions[i].y = positions[i + 1].y;
          }
          switch (direction) {
            case "right":
              positions[positions.length - 1].x += size;
              break;
            case "down":
              positions[positions.length - 1].y += size;
              break;
            case "left":
              positions[positions.length - 1].x -= size;
              break;
            case "up":
              positions[positions.length - 1].y -= size;
              break;
          }
        } else {
          while (isPaused) {
            await delay(500);
          }
        }
      } else {
        break;
      }
    } else {
      alert("Game Over");
    }
  }
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function setDisabled() {
  // disbaled = true;
  // await delay(speed);
  disbaled = false;
}
function checkCollision() {
  const headX = positions[positions.length - 1].x;
  const headY = positions[positions.length - 1].y;

  if (headX >= width || headX < 0 || headY >= height || headY < 0) {
    isEnd = true;
  }
  for (let i = 0; i < positions.length - 1; i++) {
    if (
      positions[positions.length - 1].x == positions[i].x &&
      positions[positions.length - 1].y == positions[i].y
    ) {
      isEnd = true;
    }
  }
  if (isEnd) {
    updateHighScore();
  }
}
function generateRandomNumbers() {
  let num1, num2;
  num1 = Math.floor(Math.random() * (width / size)) * size;
  num2 = Math.floor(Math.random() * (width / size)) * size;
  return [num1, num2];
}
function checkFood() {
  for (let i = 0; i < food.length; i++) {
    if (
      positions[positions.length - 1].x === food[i].x &&
      positions[positions.length - 1].y === food[i].y
    ) {
      updateDataValues();
      actuellyFood--;
      food.splice(i, 1);
      positions.push({
        x: positions[positions.length - 1].x,
        y: positions[positions.length - 1].y,
      });
      console.log(positions);
    }
  }
}
function generateFood() {
  while (actuellyFood < amountOfFood) {
    const [randomNum1, randomNum2] = generateRandomNumbers(1, 500);
    food.push({ x: randomNum1, y: randomNum2 });
    ctx.beginPath();
    ctx.rect(randomNum1, randomNum2, size, size);
    ctx.fillStyle = "red";
    ctx.fill();
    actuellyFood++;
  }
}
function pause() {
  if (isPaused) {
    isPaused = false;
  } else {
    isPaused = true;
  }
  console.log(isPaused);
}
function reset() {
  positions = [{ x: 20, y: 20 }];
  food = [];
  actuellyFood = 0;
  isEnd = false;
  direction = "right";
  ctx.clearRect(0, 0, height, width);
  getHighScore();
  start();
}
function updateButton() {
  document.getElementById("resetButton").disabled = !isEnd;
}
function updateDataValues() {
  document.getElementById("sizeAmount").innerHTML = positions.length;
  timeRead = hours + ":" + minutes + ":" + seconds;
  time = hours + minutes + seconds;
  document.getElementById("timeAmount").innerHTML = timeRead;
}
function updateHighScore() {
  const score = positions.length - 1;
  if (score > highScore) localStorage.setItem("highScore", score.toString());
  const timeNow = hours + minutes + seconds;
  timeRead = hours + ":" + minutes + ":" + seconds;
  if (timeNow > time) {
    localStorage.setItem("time", time);
    localStorage.setItem("timeRead", timeRead.toString());
  }
}
function getHighScore() {
  highScore = localStorage.getItem("highScore");
  timeRead = localStorage.getItem("timeRead");
  time = localStorage.getItem("time");
  document.getElementById("timeHighScore").innerHTML = timeRead;
  document.getElementById("HighScore").innerHTML = highScore;
}
async function startTimer() {
  while (!isEnd) {
    updateDataValues();
    seconds++;
    if (seconds == 60) {
      minutes++;
      seconds = 0;
      if (minutes == 60) {
        hours++;
        minutes = 0;
      }
    }
    await delay(1000);
  }
}
getHighScore();
