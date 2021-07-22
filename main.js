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

document.getElementById('how-to-play')
    .addEventListener("click", function () {
        document.getElementsByClassName('home-buttons')[0].classList.add('hidden');
        document.getElementsByClassName('how-to-play')[0].classList.remove('hidden');
});

document.getElementById('about')
    .addEventListener("click", function () {
        document.getElementsByClassName('home-buttons')[0].classList.add('hidden');
        document.getElementsByClassName('about')[0].classList.remove('hidden');
});

document.getElementById('new-game')
    .addEventListener("click", function () {
        document.getElementsByClassName('home-buttons')[0].classList.add('hidden');
        document.getElementsByClassName('game')[0].classList.remove('hidden');
});