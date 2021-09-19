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

const tile     = 0;
const wall = 1;
const rFruit   = 2;
const yFruit   = 3;
const bFruit   = 4;

let map    = [];
let snake  = [];
let head   = [];
let tail   = [];
let fruit  = [];
let scores = [];

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

    // set boundaries
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

/** Game Functions **/
function drawMap(){
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

/** Game Loop **/
initGame();
drawMap();

/** Screen Control **/
document.querySelectorAll('.home ul li').forEach(function(item){
    item.addEventListener("mouseover", function(){
        this.classList.add('menu-button-bigger');
    });

    item.addEventListener("mouseout", function(){
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
        document.querySelectorAll('.screen').forEach(function(item){
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