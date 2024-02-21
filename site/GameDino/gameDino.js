"use strict";

const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
let score = -1;
let isJumping = false;
let hasScored = false;
const groundImages = [
    "GameDino/data/land1.png",
    "GameDino/data/land2.png",
    "GameDino/data/land3.png"
];


document.addEventListener("keydown", function (event) {
    if ((event.key === " " || event.key === "ArrowUp") && !isJumping) {
        isJumping = true;
        dino.classList.add("jump");
        // jump();
        console.log("Hi Hi");  
    }
});

dino.addEventListener("animationend", function() {
    isJumping = false;
    dino.classList.remove("jump");
});

// function jump();

// function jump() {
//     isJumping = true;
//     let jumpHeight = 70;
//     let duration = 600; // Увеличьте продолжительность для более долгого прыжка
//     let startTime = null;

//     dino.classList.remove("run");
//     dino.classList.add("jump");

//     function jumpAnimation(timestamp) {
//         if (!startTime) startTime = timestamp;
//         let progress = timestamp - startTime;
//         let fraction = progress / duration;

//         if (progress < duration) {
//             let jumpProgress = -Math.cos(fraction * Math.PI) / 2 + 0.5; // Используйте функцию "ease-out"
//             let newY = jumpHeight * jumpProgress;
//             dino.style.top = (45 - newY) + "px";
//             requestAnimationFrame(jumpAnimation);
//         } else {
//             dino.style.top = "45px";
//             isJumping = false;
//             dino.classList.remove("jump");
//             dino.classList.add("run");
//         }
//     }
//     requestAnimationFrame(jumpAnimation);
// }


function moveGround() {
    let ground = document.getElementById("ground");
    let groundLeft = parseInt(window.getComputedStyle(ground).getPropertyValue("left"));

    if (groundLeft < -50) {
        ground.style.left = "800px";
        let randomIndex = Math.floor(Math.random() * groundImages.length);
        ground.style.backgroundImage = `url(${groundImages[randomIndex]})`;
    } else {
        ground.style.left = groundLeft - 3 + "px";
    }
}

let isAlive = setInterval(function () {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    if (cactusLeft < 40 && cactusLeft > 0 && dinoTop >= 95) {
        alert("GAME OVER!!! Your score is: " + score);
        clearInterval(isAlive);
        location.reload();
    }

    if (cactusLeft > 680 && !hasScored) { // 680 - исходная позиция кактуса
        score++;
        document.getElementById("score").innerText = "Score: " + score;
        hasScored = true;
    } else if (cactusLeft < 680) {
        hasScored = false;
    }

    moveGround();
}, 10);
