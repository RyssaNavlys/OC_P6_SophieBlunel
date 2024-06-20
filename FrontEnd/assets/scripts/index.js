// import config
import { host } from './config.js';

// import modules
// require localserver to avoid cors error
import { updateGallery } from "./index_gallery.js";
import { showLoginMenu, showLogoutMenu, showEditionModeHeader, hideEditionModeHeader, hideCategories, showCategories, showOpenModalWindowButton,hideOpenModalWindowButton } from "./interface.js";
import { initModalWindow } from "./modal_window.js";

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
fetch(host + "/works")
.then((worksList_promise) => {
    if(!worksList_promise.ok) {
        throw new Error("Erreur lors de la récupération de la liste des travaux (API).")
    } else {
        return worksList_promise.json();
    }
})
.then((worksList) => {
    // Store works list
    sessionStorage.setItem('worksList',JSON.stringify(worksList));
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
})
.catch((error) => {
    console.error(error);
});