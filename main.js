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
const maxScore = 5;
const minScore = 0;
const initLength = 5;

const tile        = 0;
const body        = 1;
const wall        = 2;
const redFruit    = 3;
const yellowFruit = 4;
const blueFruit   = 5;

let map    = [];
let snake  = [];
let head   = null;
let tail   = null;

let scores = {
    redFruits   : 0,
    yellowFruits: 0,
    blueFruits  : 0,
};

let timer = {
    minutes: 3,
    seconds: 0
};

/** Game Functions **/
function initGame() {
    let i, j, arr;
    
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

    // create snake of 5 nodes
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

function updateScore(color, onlyPrint) {
    if (['red', 'yellow', 'blue'].includes(color)) {
        if (!onlyPrint && (scores[color + 'Fruits'] - 1) > 0) {
            scores[color + 'Fruits'] -= 1;
        }
        
        document.getElementById(color + '-score').innerHTML = scores[color + 'Fruits'];
    }
}

function addNode() {
    // if no snake yet , create new one
    // else push new node

    if (!snake.length) {
        snake.push({
            y: 10,
            x: 14,
            dir: 'left',
        });

        map[snake[0].y][snake[0].x] = body;
    } else {

    }
}

function createFruit() {
    let randomY = 0, randomX = 0;

    // create new fruit on empty tile
    while (map[randomY][randomX] != tile) {
        randomY = randomNumber(1, rows - 2);
        randomX = randomNumber(1, cols - 2);
    }

    map[randomY][randomX] = randomNumber(3, 5);
}

function clearMap() {
    document.getElementById('map').innerHTML = '';
}

function moveSnake() {
    snake.forEach(function (node, index) {
        map[node.y][node.x] = tile;

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

        if (index == 0) {
            if (map[node.y][node.x] == body || map[node.y][node.x] == wall) {
                alert('you lose');
                clearInterval(gameTimer);
                clearInterval(mainLoop);
            }
        }

        map[node.y][node.x] = body;
    });
}

/** Game Loop **/
initGame();
drawMap();

let gameTimer = setInterval(function () {
    if (timer.minutes == 0 && timer.seconds == 0) {
        // check scores
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
    clearMap();
    drawMap();
    moveSnake();
}, 500);

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
        document.getElementById('home-buttons').classList.add('hidden');
        document.getElementById(this.getAttribute('data-screen')).classList.remove('hidden');

        // hide header / footer , in case the game screen
        if (this.getAttribute('data-screen') == 'game') {
            document.querySelector('.home h1').classList.add('hidden');
            document.querySelector('.home small').classList.add('hidden');
            document.querySelector('footer').classList.add('hidden');
        }
    });
});

document.querySelectorAll('.back-button').forEach(function(item) {
    item.addEventListener("click", function() {
        document.querySelectorAll('.screen').forEach(function(item) {
            item.classList.add('hidden');
        });

        document.getElementById('home-buttons').classList.remove('hidden');
    });
});

document.querySelector('#quit-button').addEventListener("click", function() {
    if (!confirm('Are You Sure?')) return;

    document.getElementById('game').classList.add('hidden');
    document.getElementById('home-buttons').classList.remove('hidden');
    document.querySelector('.home h1').classList.remove('hidden');
    document.querySelector('.home small').classList.remove('hidden');
    document.querySelector('footer').classList.remove('hidden');
});