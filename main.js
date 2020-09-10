const score = document.querySelector(".score"),
  start = document.querySelector(".start"),
  gameArea = document.querySelector(".gameArea");

const car = document.createElement("div");
car.classList.add("car");

// -------------- audio ---------------------
const audio = document.createElement("embed");

// audio.src = "./sound/audio.mp3";
// // audio.type = "audio/mp3";
// audio.style.cssText = `position: absolute; top: -1000px`;

// -------------- audio ---------------------

const MAX_ENEMY = 8;

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};

const setting = {
  start: false,
  score: 0,
  speed: 3,
  traffic: 5,
};

const getQuantityElements = (heightElement) => {
  return document.documentElement.clientHeight / heightElement + 1;
};

const startGame = () => {
  start.classList.add("hide");
  gameArea.innerHTML = "";
  for (let i = 0; i < getQuantityElements(100); i++) {
    const line = document.createElement("div");
    line.classList.add("line");
    line.style.top = i * 100 + "px";
    line.y = i * 100;
    gameArea.appendChild(line);
  }

  for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
    const enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.y = -100 * setting.traffic * (i + 1);
    enemy.style.left =
      Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + "px";
    enemy.style.top = enemy.y + "px";

    // --------------- random enemy car---------------
    //const randomEnemy = Math.floor(Math.random() * MAX_ENEMY) + 1;
    let randomEnemy = Math.floor(1 + Math.random() * MAX_ENEMY);
    let enemyImg;

    switch (randomEnemy) {
      case 1:
        enemyImg = "./image/enemy1.png";
        break;
      case 2:
        enemyImg = "./image/enemy2.png";
        break;
      case 3:
        enemyImg = "./image/enemy3.png";
        break;
      case 4:
        enemyImg = "./image/enemy4.png";
        break;
      case 5:
        enemyImg = "./image/enemy5.png";
        break;
      case 6:
        enemyImg = "./image/enemy6.png";
        break;
      case 7:
        enemyImg = "./image/enemy7.png";
        break;
      case 8:
        enemyImg = "./image/police.png";
        break;
      default:
        enemyImg = "./image/police.png";
    }

    console.log(randomEnemy);
    // --------------- random enemy car---------------

    enemy.style.background = `transparent url(${enemyImg}) center / cover no-repeat`;
    gameArea.appendChild(enemy);
  }
  setting.score = 0;
  setting.start = true;
  gameArea.appendChild(car);

  car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
  car.style.top = "auto";
  car.style.bottom = "10px";
  // gameArea.append(audio);
  setting.x = car.offsetLeft;
  setting.y = car.offsetTop;
  requestAnimationFrame(playGame);
};

const playGame = () => {
  if (setting.start) {
    setting.score += setting.speed;
    score.innerHTML = "SCORE<br>" + setting.score;
    moveRoad();
    moveEnemy();
    if (keys.ArrowLeft && setting.x > 0) {
      setting.x -= setting.speed;
    }
    if (keys.ArrowRight && setting.x < gameArea.offsetWidth - car.offsetWidth) {
      setting.x += setting.speed;
    }

    if (
      keys.ArrowDown &&
      setting.y < gameArea.offsetHeight - car.offsetHeight
    ) {
      setting.y += setting.speed;
    }

    if (keys.ArrowUp && setting.y > 0) {
      setting.y -= setting.speed;
    }

    car.style.left = setting.x + "px";
    car.style.top = setting.y + "px";
    requestAnimationFrame(playGame);
  }
};

const startRun = (event) => {
  if (keys.hasOwnProperty(event.key)) {
    event.preventDefault();
    keys[event.key] = true;
  }
};

const stopRun = (event) => {
  if (keys.hasOwnProperty(event.key)) {
    event.preventDefault();
    keys[event.key] = false;
  }
};

const moveRoad = () => {
  let lines = document.querySelectorAll(".line");
  lines.forEach((line) => {
    line.y += setting.speed;
    line.style.top = line.y + "px";

    if (line.y >= document.documentElement.clientHeight) {
      line.y = -100;
    }
  });
};

const moveEnemy = () => {
  let enemy = document.querySelectorAll(".enemy");
  enemy.forEach((item) => {
    let carRect = car.getBoundingClientRect();
    let enemyRect = item.getBoundingClientRect();

    if (
      carRect.top <= enemyRect.bottom &&
      carRect.right >= enemyRect.left &&
      carRect.left <= enemyRect.right &&
      carRect.bottom >= enemyRect.top
    ) {
      setting.start = false;
      console.warn("crash");
      start.classList.remove("hide");
      start.style.top = score.offsetHeight;
    }

    item.y += setting.speed / 2;
    item.style.top = item.y + "px";
    if (item.y >= document.documentElement.clientHeight) {
      item.y = -100 * setting.traffic;
      item.style.left =
        Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + "px";
    }
  });
};

start.addEventListener("click", startGame);
document.addEventListener("keydown", startRun);
document.addEventListener("keyup", stopRun);
