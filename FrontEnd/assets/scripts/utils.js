// function to display error
export function showError(container,message) {
    container.textContent = message;
    container.classList.add("error--display");
}
export function hideError(container) {
    container.innerHTML = "";
    container.classList.remove("error--display");
}