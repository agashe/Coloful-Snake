/**
 * Colorful-Snake
 *
 * author: Mohamed Yousef <engineer.mohamed.yousef@gmail.com>
 * version : 1.0.0
 * license: MIT
 */

/** Init **/
const rows = 13;
const cols = 20;
const maxScore   = 5;
const minScore   = 0;
const initLength = 5;
const initY      = 10;
const initX      = 14;
const initDir    = 'left';

const tile        = 0;
const body        = 1;
const wall        = 2;
const redFruit    = 3;
const yellowFruit = 4;
const blueFruit   = 5;

let map    = [];
let snake  = [];
let game   = false;
let mute   = false;

let scores = {
    redFruits   : 0,
    yellowFruits: 0,
    blueFruits  : 0
};

let timer = {
    minutes: 3,
    seconds: 0
};

/** Game Functions **/
function initGame() {
    let i, j, arr;
    
    // init all values
    map   = [];
    snake = [];

    scores = {
        redFruits   : 0,
        yellowFruits: 0,
        blueFruits  : 0,
    };

    timer = {
        minutes: 3,
        seconds: 0
    };

    // fill the map
    for (i = 0; i < rows; i++) {
        arr = [];
        for (j = 0; j < cols; j++) {
            arr.push(tile);
        }
        map.push(arr);
    }

    // set walls
    for (i = 0; i < cols; i++) {
        map[0][i] = wall; // top
        map[rows-1][i] = wall; // bottom
    }
    
    for (i = 0; i < rows; i++) {
        map[i][0] = wall; // right
        map[i][cols-1] = wall; // left
    }
    
    // set random scores
    scores.redFruits = randomNumber(minScore, maxScore); 
    updateScore('red', true);
    scores.yellowFruits = randomNumber(minScore, maxScore);
    updateScore('yellow', true);
    scores.blueFruits = randomNumber(minScore, maxScore); 
    updateScore('blue', true);

    // create new snake
    for (i = 0; i < initLength; i++) {
        addNode();
    }

    // add random fruit
    createFruit();
}

function drawMap() {
    let i, j, el;
    
    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            el = document.createElement('div');
            el.classList.add('tile');
            el.innerHTML = ' ';

            // set tile type (if it's not just empty)
            switch (map[i][j]) {
                case body:
                    el.classList.add('body');
                break;
                case wall:
                    el.classList.add('wall');                    
                break;
                case redFruit:
                    el.classList.add('red');                    
                break;
                case yellowFruit:
                    el.classList.add('yellow');                    
                break;
                case blueFruit:
                    el.classList.add('blue');                    
                break;
            }

            document.getElementById('map').append(el);
        }
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatTime(time) {
    return (time < 10)? ('0' + time) : time;
}

function updateScore(color, onlyPrint = false) {
    if (['red', 'yellow', 'blue'].includes(color)) {
        if (!onlyPrint && (scores[color + 'Fruits'] - 1) >= 0) {
            scores[color + 'Fruits'] -= 1;
        }

        document.getElementById(color + '-score').innerHTML = scores[color + 'Fruits'];
    }
}

function checkWin() {
    return (!scores['redFruits'] & !scores['yellowFruits'] & !scores['blueFruits']);
}

function showScreen(screen) {
    // default show/hide for all screens
    document.querySelectorAll('.screen').forEach(function(item) {
        item.classList.add('hidden');
    });
    
    document.getElementById('home-buttons').classList.add('hidden');
    document.querySelector('.home h1').classList.remove('hidden');
    document.querySelector('.home small').classList.remove('hidden');
    document.querySelector('footer').classList.remove('hidden');

    // handle home screens
    if (screen == 'home') {
        document.getElementById('home-buttons').classList.remove('hidden');
    } else {
        document.getElementById(screen).classList.remove('hidden');
    }

    // handle game screen
    if (screen == 'game') {
        document.querySelector('.home h1').classList.add('hidden');
        document.querySelector('.home small').classList.add('hidden');
        document.querySelector('footer').classList.add('hidden');
    }
}

function addNode() {
    let x = 0, y = 0, dir = '';

    // if no snake yet , create new one
    // else push new node
    if (!snake.length) {
        y = initY;
        x = initX;
        dir = initDir;
    } else {
        y   = snake[snake.length - 1].y;
        x   = snake[snake.length - 1].x;
        dir = snake[snake.length - 1].dir;

        switch (snake[snake.length - 1].dir) {
            case 'up':
                y += 1;
                break;
            case 'right':
                x -= 1;
                break;
            case 'down':
                y -= 1;
                break;
            case 'left':
                x += 1;
                break;
        }
    }

    // create the node and render
    snake.push({
        y: y,
        x: x,
        dir: dir
    });
    
    map[snake[0].y][snake[0].x] = body;
}

function createFruit() {
    let randomY = 0, randomX = 0;

    // create new fruit on empty tile
    while (map[randomY][randomX] != tile) {
        randomY = randomNumber(1, rows - 2);
        randomX = randomNumber(1, cols - 2);
    }

    // set fruit color (min: red -> 3 , max: blue -> 5)
    map[randomY][randomX] = randomNumber(redFruit, blueFruit);
}

function clearMap() {
    document.getElementById('map').innerHTML = '';
}

function playSound(action) {
    if (!mute) {
        document.getElementById(`${action}-sound`).play();
    }
}

function startGame() {
    game = true;
    initGame();
    drawMap();
}

function toggleGameStatus() {
    game = !game;
}

function stopGame() {
    game = false;
    clearMap();
}

function toggleMute() {
    mute = !mute;
}

function moveSnake() {
    let x = 0, y = 0, dir = '';
    let oldX = 0, oldY = 0, oldDir = '';

    snake.forEach(function (node, index) {
        y = node.y;
        x = node.x;
        dir = node.dir;

        map[node.y][node.x] = tile;
        
        if (index == 0) {
            switch (node.dir) {
                case 'up':
                    node.y -= 1;
                    break;
                case 'right':
                    node.x += 1;
                    break;
                case 'down':
                    node.y += 1;
                    break;
                case 'left':
                    node.x -= 1;
                    break;
            }

            if (map[node.y][node.x] == body || map[node.y][node.x] == wall) {
                // set game in lose mode
                stopGame();
                showScreen('lose');
                playSound('lose');
            } else {
                if (map[node.y][node.x] != tile) {
                    if (map[node.y][node.x] == redFruit) {
                        updateScore('red');
                    }
                    else if (map[node.y][node.x] == yellowFruit) {
                        updateScore('yellow');
                    }
                    else if (map[node.y][node.x] == blueFruit) {
                        updateScore('blue');
                    }

                    playSound('eat');

                    // check if the player win or add new fruit
                    if (checkWin()) {
                        // set game in win mode
                        stopGame();
                        showScreen('win');
                        playSound('win');
                    } else {
                        createFruit();
                    }
                }
            }
        } else {
            node.y = oldY;
            node.x = oldX;
            node.dir = oldDir;
        }

        oldY = y;
        oldX = x;
        oldDir = dir;

        map[node.y][node.x] = body;
    });
}

/** Game Loop **/
let gameTimer = setInterval(function () {
    if (!game) return;

    if (timer.minutes == 0 && timer.seconds == 0) {
        // check if the player win or lose
        stopGame();

        if (checkWin()) {
            showScreen('win');
            playSound('win');
        } else {
            showScreen('lose');
            playSound('lose');
        }
    }
    else if (timer.seconds == 0) {
        timer.minutes -= 1;
        timer.seconds = 59;
    }
    else {
        timer.seconds -= 1;
    }

    document.querySelector('#timer h1').innerHTML = `
        ${formatTime(timer.minutes)}:${formatTime(timer.seconds)}
    `;
}, 1000);

let mainLoop = setInterval(function () {
    if (!game) return;

    clearMap();
    drawMap();
    moveSnake();
}, 250);

/** Game Control **/
window.addEventListener('keyup', function (e) {
    if (!snake.length) {
        return; // stop any input before snake creation
    }
    else if (e.keyCode == 38 && snake[0].dir != 'down') {
        snake[0].dir = 'up';
    }
    else if (e.keyCode == 39 && snake[0].dir != 'left') {
        snake[0].dir = 'right';
    }
    else if (e.keyCode == 40 && snake[0].dir != 'up') {
        snake[0].dir = 'down';
    }
    else if (e.keyCode == 37 && snake[0].dir != 'right') {
        snake[0].dir = 'left';
    }

    moveSnake();
    clearMap();
    drawMap();
    
    return;
});

/** Screen Control **/
document.querySelectorAll('.home ul li').forEach(function(item) {
    item.addEventListener("mouseover", function() {
        this.classList.add('menu-button-bigger');
    });

    item.addEventListener("mouseout", function() {
        this.classList.remove('menu-button-bigger');
    });
});

document.querySelectorAll('.menu-button').forEach(function(item) {
    item.addEventListener("click", function() {   
        showScreen(this.getAttribute('data-screen'));

        // start the game , in case the game screen
        if (this.getAttribute('data-screen') == 'game') {
            startGame();
        }
    });
});

document.querySelectorAll('.back-button').forEach(function(item) {
    item.addEventListener("click", function() {
        showScreen('home');
    });
});

document.querySelectorAll('.play-again-button').forEach(function(item) {
    item.addEventListener("click", function () {
        showScreen('game');
        startGame();
    });
});

document.querySelector('#quit-button').addEventListener("click", function() {
    if (!confirm('Are You Sure?')) return;

    stopGame();
    showScreen('home');
});

document.querySelector('#pause-button').addEventListener("click", function () {
    toggleGameStatus();
    document.querySelector('#pause-button').innerHTML = (game)? 'Pause' : 'Continue';
});

document.querySelector('#mute-button').addEventListener("click", function () {
    toggleMute();
    document.querySelector('#mute-button').innerHTML = (mute)? 'Unmute' : 'Mute';
});