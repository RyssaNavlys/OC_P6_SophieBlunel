
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
        selectModalSection('modal-gallery'); // show "modale-gallery" modal window content
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
        switch(className) {
            case "modal-gallery":
                // get workslist from local storage
                let worksList = JSON.parse(window.localStorage.getItem('worksList'));
                initModalGallery(worksList);
                break;
            case "modal-add":
                initModalAdd();
                break;  
        }
    }
}

function initModalGallery(worksList) {
    // get modal-gallery content container and delimiter to insert article before
    const modalGalleryContent = document.querySelector(".modal-gallery__content");
    const delimiter = modalGalleryContent.querySelector('hr');

    // onlyfirst time or empty gallery before ?
    const modalCurrentGallery = modalGalleryContent.querySelectorAll('article');
    modalCurrentGallery.forEach(node => node.remove());

    // add workslist dynamically
    for(let work of worksList) {
        // article creation
        let article = document.createElement('article');
        article.classList.add('modal-gallery__content__photo');
        article.innerHTML = `<img src="${work.imageUrl}" alt="${work.imageUrl}">`;
        articleDelButton = document.createElement('i');
        articleDelButton.classList.add('fa-solid', 'fa-trash-can');
        article.appendChild(articleDelButton);
        modalGalleryContent.insertBefore(article,delimiter);
        // event listener creation
        articleDelButton.addEventListener('click', () => {
            deleteWork(work);
        });
    }
    // setup "add work" button
    modalGalleryAddButton = modalGalleryContent.querySelector('.modal-gallery__content__button-new');
    modalGalleryAddButton.addEventListener("click", () => {
        selectModalSection('modal-add');
    });
}

function deleteWork(work) {
    console.log("delete work with id " + work.id);
}