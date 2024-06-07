// Global API host path
const host = "http://localhost:5678/api";

// listen form submit
const submitButton = document.getElementById('login').querySelector('button');
submitButton.addEventListener('click', (mouseEvent) => {
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
        }).then(response => {
            if(response.status === 200) {
                return response.json();
            } else if(response.status === 401) {
                alert(`Erreur dans l'identifiant ou le mot de passe. Veuillez réessayer.`)
            } else {
                return false;
            }
        })
        .then(user => {
            if(user === false) {
                return false;
            } else {
                window.sessionStorage.setItem('token',user.token);
                window.sessionStorage.setItem('userId',user.userId);
                window.location.href = "index.html";
            }

        });
    }
});