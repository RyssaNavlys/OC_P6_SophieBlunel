// import config
import { host } from './config.js';

// import error function
import { showError } from "./utils.js";

// listen form submit
const submitButton = document.getElementById('login').querySelector('button');
submitButton.addEventListener('click', async (mouseEvent) => {
    // prevent default submit
    mouseEvent.preventDefault();
    // check form constraints
    const form = document.getElementById('login').querySelector('form');
    if(form.reportValidity()) {
        // Get form content
        const userInput = document.getElementById('email');
        const pwInput = document.getElementById('password');
        const body = { "email": userInput.value, "password": pwInput.value };
        // Send login request
        fetch(host + '/users/login',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
        .then((response) => {
            if(response.ok) {
                return response.json();
            // manage errors
            } else if(response.status === 401) {
                throw new Error("Identifiant ou mot de passe incorrect");
            } else if(response.status === 404) {
                throw new Error("L'e-mail est incorrect");
            } else {
                throw new Error("Une erreur s'est produite, veuillez retenter plus tard");
            }
        })
        .then((user) => {
            window.sessionStorage.setItem('token',user.token);
            window.sessionStorage.setItem('userId',user.userId);
            window.location.href = "index.html";
        })
        .catch((error) => {
            showError(document.getElementById('login').querySelector(".error"),error);
        });
    }
});
