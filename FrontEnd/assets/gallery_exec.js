// Global API host path
const host = "http://localhost:5678/api";

// Run main script
initGallery();
updateGallery();

// Run edit script if token is stored (ie login succeed)
if(window.sessionStorage.getItem('token')) {
    changeLoginMenu();
    initModalWindow();
}