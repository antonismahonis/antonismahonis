"use strict";

const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
let score = 0;
let isJumping = false;
const groundImages = [
    "data/land1.png",
    "data/land2.png",
    "data/land3.png"
];


document.addEventListener("keydown", function (event) {
    if ((event.key === " " || event.key === "ArrowUp") && !isJumping) {
        jump();
    }
});

function jump() {
    isJumping = true;
    let jumpHeight = 50;
    let duration = 500;
    let startTime = null;

    dino.classList.remove("run");
    dino.classList.add("jump");

    function jumpAnimation(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = timestamp - startTime;

        if (progress < duration) {
            let jumpProgress = Math.sin((progress / duration) * (Math.PI / 2));
            let newY = jumpHeight * jumpProgress;
            dino.style.top = (45 - newY) + "px";
            requestAnimationFrame(jumpAnimation);
        } else {
            dino.style.top = "45px";
            isJumping = false;
            dino.classList.remove("jump");
            dino.classList.add("run");
        }
    }

    requestAnimationFrame(jumpAnimation);
}

function moveGround() {
    let ground = document.getElementById("ground");
    let groundLeft = parseInt(window.getComputedStyle(ground).getPropertyValue("left"));

    if (groundLeft < -50) {
        ground.style.left = "800px";
        let randomIndex = Math.floor(Math.random() * groundImages.length);
        ground.style.backgroundImage = `url(${groundImages[randomIndex]})`;
        score++;
    } else {
        ground.style.left = groundLeft - 3 + "px";
    }

    // Обновляем счет на экране
    document.getElementById("score").innerText = "Score: " + score;
}

let isAlive = setInterval(function () {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    if (cactusLeft < 40 && cactusLeft > 0 && dinoTop >= 95) {
        alert("GAME OVER!!! Your score is: " + score);
        clearInterval(isAlive);
        location.reload();
    }

    moveGround();
}, 10);
