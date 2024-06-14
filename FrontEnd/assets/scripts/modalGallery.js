// import required modules
import { selectModalSection, deleteWork } from "./modalWindow_functions.js";


// Prepare modal section
export function prepareModalGallery() {
    // get modal-gallery content container and delimiter to insert article before
    const modalGalleryContent = document.querySelector(".modal-gallery__content");

    // update Modal gallery
    updateModalGallery();
    
    // setup "add work" button
    const modalGalleryAddButton = modalGalleryContent.querySelector('.modal-gallery__content__button-new');
    modalGalleryAddButton.addEventListener("click", () => {
        selectModalSection('modal-add');
    });
}

// drop modal gallery content (remove every work displayed)
export function dropModalGallery() {
    // empty gallery if any
    const modalCurrentGallery = document.querySelector(".modal-gallery__content").querySelectorAll('article');
    modalCurrentGallery.forEach(node => node.remove());
}
export function updateModalGallery() {
    // get modal-gallery content container and delimiter to insert article before
    const modalGalleryContent = document.querySelector(".modal-gallery__content");
    const delimiter = modalGalleryContent.querySelector('hr');

    // get worlsList
    let worksList = JSON.parse(window.sessionStorage.getItem("worksList"));

    // add workslist dynamically
    for(let work of worksList) {
        // article creation
        let article = document.createElement('article');
        article.classList.add('modal-gallery__content__photo');
        article.innerHTML = `<img src="${work.imageUrl}" alt="${work.imageUrl}">`;
        const articleDelButton = document.createElement('i');
        articleDelButton.classList.add('fa-solid', 'fa-trash-can');
        article.appendChild(articleDelButton);
        modalGalleryContent.insertBefore(article,delimiter);
        // event listener creation
        articleDelButton.addEventListener('click', () => {
            deleteWork(work);
        });
    }
}