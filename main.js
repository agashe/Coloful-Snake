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

document.querySelectorAll('.menu-button').forEach(function (item) {
    item.addEventListener("click", function () {
        document.getElementById('home-buttons').classList.add('hidden');
        document.getElementById(this.getAttribute('data-screen')).classList.remove('hidden');
    });
});

document.querySelectorAll('.back-button').forEach(function (item) {
    item.addEventListener("click", function () {
        document.querySelectorAll('.screen').forEach(function(item){
            item.classList.add('hidden');
        });

        document.getElementById('home-buttons').classList.remove('hidden');
    });
});