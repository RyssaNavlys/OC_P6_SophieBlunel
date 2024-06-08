
// Initiate edition
function initGalleryEdition() {
    // Adding edit button
    const editButton = document.createElement('span');
    editButton.innerHTML='<i class="fa-regular fa-pen-to-square"></i>modifier';
    editButton.classList.add('portfolioEdit');
    document.getElementById('portfolio').querySelector('h2').appendChild(editButton);
    // Display modale onclick
    editButton.addEventListener('click', () => {
        // Affichage de la modale
        displayModalWindow(); // show global modale window
        selectModalSection('modal-add'); // show "modale-gallery" modal window content
    });
    
}

// function to display modal window (no content)
function displayModalWindow() {
    const modalWindow = document.querySelector('.modal-window');
    modalWindow.classList.add('modal-window--display');
}

// function to add modal window + section
function hideModalWindow() {
    console.log('close modal window');
    hideModalSections();
    // hide modal Window
    const modalWindow = document.querySelector('.modal-window');
    modalWindow.classList.remove('modal-window--display');
}

function hideModalSections() {
    // hide every displayed modal section
    const modalSectionsList = document.querySelectorAll('.modal-window__inner-block__section--display');
    for(let modalSection of modalSectionsList) {
        modalSection.classList.remove('modal-window__inner-block__section--display');
    }
}

function selectModalSection(className) {
    hideModalSections();
    // get section with className; if not found => close modal window
    const modalSection = document.querySelector('.' + className);
    if(!modalSection) {
        hideModalWindow();
        return false;
    } else {
        // add display class
        modalSection.classList.add('modal-window__inner-block__section--display');
        // add nav events listener (previous, close) if any
        const navBar = modalSection.querySelector('.modal-window__inner-block__section__navbar');
        const modalWindowClose = navBar.querySelector('.modal-window__inner-block__section__navbar__close');
        const modalWindowPrevious = navBar.querySelector('.modal-window__inner-block__section__navbar__previous');
        if(modalWindowClose) {
            modalWindowClose.addEventListener('click',hideModalWindow);
        }
        if(modalWindowPrevious) {
            modalWindowPrevious.addEventListener('click',() => {
                selectModalSection('modal-gallery');
            });
        }
        // add events listener modal specific (del // check form + post) <-- simply switch ?
        switch(modalSection) {
            case "modal-gallery":
                console.log('specific events for gallery');
                break;
            case "modal-add":
                console.log('specific events for add');
                break;
                
        }
    }
}