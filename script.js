"use strict";

const hamBtn = document.querySelector("#ham");

const closeBtn = document.querySelector('#close');

const menu = document.querySelector("#slideMenu");

hamBtn.addEventListener("click", function () {
    openMenu();
});

closeBtn.addEventListener("click", function () {
    closeMenu();
});

function openMenu() {
    hamBtn.style.cssText = `display: none;`;
    closeBtn.style.cssText = `display: contents;`;
    menu.style.cssText = `display: contents;`;
}

function closeMenu() {
    hamBtn.style.cssText = `display: contents;`;
    closeBtn.style.cssText = `display: none;`;
    menu.style.cssText = `display: none;`;
}