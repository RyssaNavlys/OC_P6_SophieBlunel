// import config file
import { host } from "./config.js";

// import error function
import { error } from "./utils.js";

// import specific modal sections function
import { prepareModalGallery, dropModalGallery, updateModalGallery } from "./modalGallery.js";
import { prepareModalAdd } from "./modalAdd.js";
import { updateGallery } from "./gallery_functions.js";

// Initiate edition
export function initModalWindow() {
    // Adding edit button
    const editButton = document.createElement('span');
    editButton.innerHTML='<i class="fa-regular fa-pen-to-square"></i>modifier';
    editButton.classList.add('portfolioEdit');
    document.getElementById('portfolio').querySelector('h2').appendChild(editButton);
    // Prépare modal sections
    prepareModalGallery();
    prepareModalAdd();
    // Display modale onclick
    editButton.addEventListener('click', () => {
        // Affichage de la modale
        openModalWindow();
        selectModalSection('modal-gallery');
    });
}

// function to open modal window (no content)
function openModalWindow() {
    const modalWindow = document.querySelector('.modal-window');
    modalWindow.classList.add('modal-window--display');
}

// function to close modal window + sections
function closeModalWindow() {
    hideModalSections();
    // hide modal Window
    const modalWindow = document.querySelector('.modal-window');
    modalWindow.classList.remove('modal-window--display');
}
// close every displayed modal sections
function hideModalSections() {
    // hide every displayed modal section
    const modalSectionsList = document.querySelectorAll('.modal-window__inner-block__section--display');
    for(let modalSection of modalSectionsList) {
        modalSection.classList.remove('modal-window__inner-block__section--display');
    }
}

// SelectModalSection (display)
export function selectModalSection(className) {
    // unselect every other selected section
    hideModalSections();
    // get section with className; if not found => close modal window
    const modalSection = document.querySelector('.' + className);
    // if modal Section doesn't exist, close modal window
    if(!modalSection) {
        closeModalWindow();
    } else {
        // add display class
        modalSection.classList.add('modal-window__inner-block__section--display');
        // add nav events listener (previous, close) if any
        const navBar = modalSection.querySelector('.modal-window__inner-block__section__navbar');
        const modalWindowClose = navBar.querySelector('.modal-window__inner-block__section__navbar__close');
        const modalWindowPrevious = navBar.querySelector('.modal-window__inner-block__section__navbar__previous');
        if(modalWindowClose) {
            modalWindowClose.addEventListener('click',closeModalWindow);
        }
        if(modalWindowPrevious) {
            modalWindowPrevious.addEventListener('click',() => {
                selectModalSection('modal-gallery');
            });
        }
    }
}


// Modal : add work
export function addWork(workFormData) {
    const token = window.sessionStorage.getItem("token");
    // API : add work
    fetch(host + '/works', {
        method: 'POST',
        headers: {
                'Authorization': `Bearer ${token}`,
                },
        body: workFormData,
    }).then((response) => {
        if(!response.ok) {
            throw "L'ajout n'a pas fonctionné. Vérifiez vos données et réessayez plus tard.";
        } else {
            return response.json();
        }
    }).then((newWork) => {
        // Load all works from API
        fetch(host + "/works")
        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                // reset form
                document.querySelector(".modal-add__content__form").reset();
                throw "L'ajout a réussi mais une erreur est survenue durant la mise à jour des gallery : veuillez rafraichir la page."
            }
        })
        .then(worksList => {
            // Store works
            window.sessionStorage.setItem('worksList',JSON.stringify(worksList));
            // update every gallery
            updateEveryGallery();
            closeModalWindow();
        }).catch((errorMessage) => {
            // error container
            const errorContainer = document.querySelector(".modal-add").querySelector(".error");
            //display error
            error(errorContainer,errorMessage);
        });
    }).catch((errorMessage) => {
        // error container
        const errorContainer = document.querySelector(".modal-add").querySelector(".error");
        //display error
        error(errorContainer,errorMessage);
    });
}

// Modal : delete work
export function deleteWork(work) {
    // confirmation window
    if(confirm("Voulez-vous vraiment supprimer le travail : " + work.title)) {
        const token = window.sessionStorage.getItem("token");
        // API : delete work
        fetch(host + "/works/" + work.id, {
            method: 'DELETE',
            headers: {
                    'Authorization': `Bearer ${token}`,
                    },
        }).then((response) => {
            if(!response.ok) {
                throw "Erreur de suppression de l'élément. Veuillez retenter ultérieurement.";
            } else {
                // Edit sessionStorage
                const worksList = JSON.parse(window.sessionStorage.getItem("worksList"));
                const filteredWorksList = worksList.filter((workElement) => workElement.id !== work.id);
                window.sessionStorage.setItem("worksList",JSON.stringify(filteredWorksList));
                updateEveryGallery();
            }
        }).catch((errorMessage) => {
            // error container
            let errorContainer = document.querySelector(".modal-gallery").querySelector(".error");
            // display error
            error(errorContainer,errorMessage);
        });
    }
}

function updateEveryGallery() {
    dropModalGallery();
    updateModalGallery();
    updateGallery();
}