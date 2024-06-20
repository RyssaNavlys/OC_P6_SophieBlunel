// import config
import { host } from './scripts/config.js';

// import modules
// require localserver to avoid cors error
import { updateGallery } from "./scripts/gallery_functions.js";
import { showLoginMenu, showLogoutMenu, showEditionModeHeader, hideEditionModeHeader, hideCategories, showCategories, showOpenModalWindowButton,hideOpenModalWindowButton } from "./scripts/interface.js";
import { initModalWindow } from "./scripts/modalWindow_functions.js";

// index page interface states
export function editionModeIndexInterface() {
    showEditionModeHeader();
    showLogoutMenu();
    hideCategories();
    showOpenModalWindowButton();
}
export function normalModeIndexInterface() {
    hideEditionModeHeader();
    showLoginMenu();
    showCategories();
    hideOpenModalWindowButton();
}

// Load all works from API
// If success > updategallery, load modal window if needed ...
try {
    let worksList_promise = await fetch(host + "/works");
    if(worksList_promise.ok) {
        let workList = await worksList_promise.json();
        // Store works list
        sessionStorage.setItem('worksList',JSON.stringify(workList));
        // index gallery building (+categories filters)
        updateGallery();
        // logged users
        if(window.sessionStorage.getItem('token')) {
            editionModeIndexInterface();
            initModalWindow();
        // non logged users
        } else {
            normalModeIndexInterface();
        }
    } else {
        throw new Error("Erreur lors de la récupération de la liste des travaux (API).")
    }
} catch(error) {
    console.log(error);
}