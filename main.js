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
        this.style.fontSize = '2.5rem';
    });

    item.addEventListener("mouseout", function(){
        this.style.fontSize = '2rem';
    });
});