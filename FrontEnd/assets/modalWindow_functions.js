
// Initiate edition
function initModalWindow() {
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
function selectModalSection(className) {
    // unselect every other selected section
    hideModalSections();
    // get section with className; if not found => close modal window
    const modalSection = document.querySelector('.' + className);
    if(!modalSection) {
        closeModalWindow();
        return false;
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
function addWork(work) {

    console.log("add work");
    console.log(work);
    updateEveryGallery()
}

// Modal : delete work
function deleteWork(work) {
    console.log("delete work with id " + work.id);
    updateEveryGallery()
}

function updateEveryGallery() {
    dropModalGallery();
    updateModalGallery();
    // update gallery index.html

}