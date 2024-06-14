// function to display error
export function error(container,message) {
    container.innerHTML = message;
    container.classList.add("error--display");
}