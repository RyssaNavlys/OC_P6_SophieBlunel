import { normalModeIndexInterface } from "./index.js";
import { openModalWindow, selectModalSection } from "./modal_window.js"; 

// DOM elements
const menuLink = document.getElementById("loginLink");
const editionModeHeader = document.querySelector('.edition-mode');
const header = document.querySelector("header");
const portfolioCategories = document.getElementById("portfolio").querySelector(".categories");

// change menu login <-> logout
function logout(mouseEvent) {
    mouseEvent.preventDefault();
    sessionStorage.clear();
    normalModeIndexInterface();
}
export function showLogoutMenu() {
    menuLink.textContent="logout";
    menuLink.addEventListener('click', logout);
}
export function showLoginMenu() {
    menuLink.textContent="login";
    menuLink.removeEventListener('click', logout);
}

// display and hide edition-mode header
export function showEditionModeHeader() {
    editionModeHeader.classList.add("edition-mode--display");
    header.classList.add("edition-mode-header");
}
export function hideEditionModeHeader() {
    editionModeHeader.classList.remove("edition-mode--display");
    header.classList.remove("edition-mode-header");
}

// display or hide categories
export function showCategories() {
    portfolioCategories.classList.remove("categories--hide");
}
export function hideCategories() {
    portfolioCategories.classList.add("categories--hide");
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
