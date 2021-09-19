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

const tile        = 0;
const wall        = 1;
const redFruit    = 2;
const yellowFruit = 3;
const blueFruit   = 4;

let map    = [];
let snake  = [];
let head   = [];
let tail   = [];

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
    let i, j, k, arr;
    
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
    }
    
    for (i = 0; i < rows; i++) {
        map[i][0] = wall; // right
    }
    
    for (i = 0; i < cols; i++) {
        map[rows-1][i] = wall; // bottom
    }

    for (i = 0; i < rows; i++) {
        map[i][cols-1] = wall; // left
    }
}

function drawMap() {
    let i, j, el;
    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            switch (map[i][j]) {
                case tile:
                    el = document.createElement('div');
                    el.classList.add('tile');
                    el.innerHTML = ' ';
                    document.getElementById('map').append(el);
                break;
                case wall:
                    el = document.createElement('div');
                    el.classList.add('tile');
                    el.classList.add('wall');
                    el.innerHTML = ' ';
                    document.getElementById('map').append(el);
                break;
            }
        }
    }
}

function formatTime(time) {
    return (time < 10)? ('0' + time) : time;
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
    // the whole fun
}, 100);

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

document.querySelector('#game-back-button').addEventListener("click", function() {
    if (!confirm('Are You Sure?')) return;

    document.getElementById('game').classList.add('hidden');
    document.getElementById('home-buttons').classList.remove('hidden');
    document.querySelector('.home h1').classList.remove('hidden');
    document.querySelector('.home small').classList.remove('hidden');
    document.querySelector('footer').classList.remove('hidden');
});