import { normalModeIndexInterface } from "../index.js";
import { openModalWindow, selectModalSection } from "./modalWindow_functions.js"; 

// change menu login <-> logout
function logout(mouseEvent) {
    mouseEvent.preventDefault();
    window.sessionStorage.clear();
    normalModeIndexInterface();
}
export function showLogoutMenu() {
    const menuLink = document.getElementById("loginLink");
    menuLink.innerHTML="logout";
    menuLink.addEventListener('click', logout);
}
export function showLoginMenu() {
    const menuLink = document.getElementById("loginLink");
    menuLink.innerHTML="login";
    // change on click function
    menuLink.removeEventListener('click', logout);
}

// display and hide edition-mode header
export function showEditionModeHeader() {
    document.querySelector('.edition-mode').classList.add("edition-mode--display");
    document.querySelector("header").classList.add("edition-mode-header");
}
export function hideEditionModeHeader() {
    document.querySelector('.edition-mode').classList.remove("edition-mode--display");
    document.querySelector("header").classList.remove("edition-mode-header");
}

// display or hide categories
export function showCategories() {
    document.getElementById("portfolio").querySelector(".categories").classList.remove("categories--hide");
}
export function hideCategories() {
    document.getElementById("portfolio").querySelector(".categories").classList.add("categories--hide");
}

// display or hide modal window button
export function showOpenModalWindowButton() {
    const editButton = document.createElement('span');
    editButton.innerHTML='<i class="fa-regular fa-pen-to-square"></i>modifier';
    editButton.classList.add('portfolioEdit');
    document.getElementById('portfolio').querySelector('h2').appendChild(editButton);
    // Display modale onclick
    editButton.addEventListener('click', () => {
        // Affichage de la modale
        openModalWindow();
        selectModalSection('modal-gallery');
    });
}
export function hideOpenModalWindowButton() {
    const openModalWindowButton = document.getElementById('portfolio').querySelector(".portfolioEdit");
    if(openModalWindowButton) { openModalWindowButton.remove(); }
}
