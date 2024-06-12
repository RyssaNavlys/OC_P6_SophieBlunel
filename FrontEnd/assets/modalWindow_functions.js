
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
function addWork(workFormData) {
    console.log("add work :");
    //categoryId = Number(workFormData.get("category")); // parseInt
    //workFormData.set("category",categoryId);
    console.log(workFormData);
    const token = window.sessionStorage.getItem("token");
    // API : add work
    fetch(host + '/works', {
        method: 'POST',
        headers: {
                'Authorization': `Bearer ${token}`,
                },
        body: workFormData,
    }).then((response) => {
        if(response.status !== 201) {
            console.log("API : erreur d'ajout du work");
            return false;
        } else {
            return response.json();
        }
    }).then((newWork) => {
        // Edit localStorage
        /*const worksList = JSON.parse(window.localStorage.getItem("worksList"));
        worksList.push(newWork);
        window.localStorage.setItem("worksList",JSON.stringify(worksList));*/

        // Load all works from API
        fetch(host + "/works")
        .then(response => {
            if(response.status === 200) {
                return response.json();
            } else {
                console.log('API : erreur lors de la récupération des travaux.');
                return false;
            }
        })
        .then(worksList => {
            if(worksList === false) {
                return false;
            } else {
                // Store works
                console.log('try to store');
                window.localStorage.setItem('worksList',JSON.stringify(worksList));
                // update every gallery
                updateEveryGallery();
                closeModalWindow();
            }
        });
        /*console.log(window.localStorage.getItem("worksList"));
        window.localStorage.removeItem("worksList");
        console.log(window.localStorage.getItem("worksList"));
        initGallery();
        console.log(window.localStorage.getItem("worksList"));*/
    });
}

// Modal : delete work
function deleteWork(work) {
    console.log("delete work with id " + work.id);
    if(confirm("Voulez-vous vraiment supprimer le travail : " + work.title)) {
        console.log("confirmé");
        const token = window.sessionStorage.getItem("token");
        // API : delete work
        fetch(host + "/works/" + work.id, {
            method: 'DELETE',
            headers: {
                    'Authorization': `Bearer ${token}`,
                    },
        }).then((response) => {
            if(response.status !== 204) {
                console.log("API : erreur de suppression du work");
                console.log(response);
            } else {
                // Edit localStorage
                const worksList = JSON.parse(window.localStorage.getItem("worksList"));
                const filteredWorksList = worksList.filter((workElement) => workElement.id !== work.id);
                window.localStorage.setItem("worksList",JSON.stringify(filteredWorksList));
                updateEveryGallery();
            }
        });
    }
}

function updateEveryGallery() {
    dropModalGallery();
    updateModalGallery();
    updateGallery();
}