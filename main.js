/**
 * Colorful-Snake
 *
 * author: Mohamed Yousef <engineer.mohamed.yousef@gmail.com>
 * version : 1.0.0
 * license: MIT
 */

/** Init **/




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