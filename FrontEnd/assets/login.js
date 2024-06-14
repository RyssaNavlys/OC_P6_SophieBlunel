// import config
import { host } from './scripts/config.js';

// import error function
import { error } from "./scripts/utils.js";

// listen form submit
const submitButton = document.getElementById('login').querySelector('button');
submitButton.addEventListener('click', async (mouseEvent) => {
    // prevent default submit
    mouseEvent.preventDefault();
    // check form constraints
    const form = document.getElementById('login').querySelector('form');
    if(form.reportValidity()) {
        try {
            // Get form content
            const userInput = document.getElementById('email');
            const pwInput = document.getElementById('password');
            const body = { "email": userInput.value, "password": pwInput.value };
            // Send login request
            let response = await fetch(host + '/users/login',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            // if login success : store token + userId then redirect to home
            if(response.ok) {
                const user = await response.json();
                window.sessionStorage.setItem('token',user.token);
                window.sessionStorage.setItem('userId',user.userId);
                window.location.href = "index.html";
            // manage errors
            } else if(response.status === 401) {
                throw "Identifiant ou mot de passe incorrect";
            } else if(response.status === 404) {
                throw "L'e-mail est incorrect";
            } else {
                throw "Une erreur s'est produite, veuillez retenter plus tard";
            }
        } catch(errorMessage) {
            const errorDiv = document.getElementById('login').querySelector(".error");
            error(errorDiv,errorMessage);
        }
    }
});
