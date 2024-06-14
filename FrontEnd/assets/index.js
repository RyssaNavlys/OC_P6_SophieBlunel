// import modules
// require localserver to avoid cors error
import { loadGallery } from "./scripts/gallery_functions.js";
import { changeLoginMenu } from "./scripts/login_functions.js";
import { initModalWindow } from "./scripts/modalWindow_functions.js";

// Run main script
loadGallery();

// Run edit script if token is stored (ie login succeed)
if(window.sessionStorage.getItem('token')) {
    changeLoginMenu();
    initModalWindow();
}