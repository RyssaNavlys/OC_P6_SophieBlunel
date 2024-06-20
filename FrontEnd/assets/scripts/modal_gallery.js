// import required modules
import { selectModalSection, deleteWork } from "./modal_window.js";

// DOM elements
const modalGalleryContent = document.querySelector(".modal-gallery__content");
const delimiter = modalGalleryContent.querySelector('hr');

// Prepare modal section
export function prepareModalGallery() {
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
    const modalCurrentGallery = modalGalleryContent.querySelectorAll('article');
    modalCurrentGallery.forEach(node => node.remove());
}
export function updateModalGallery() {
    // get worlsList
    let worksList = JSON.parse(sessionStorage.getItem("worksList"));
    // add workslist dynamically
    let worksListFragment = document.createDocumentFragment();
    for(let work of worksList) {
        // article creation
        let article = document.createElement('article');
        article.classList.add('modal-gallery__content__photo');
        let img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;
        const articleDelButton = document.createElement('i');
        articleDelButton.classList.add('fa-solid', 'fa-trash-can');
        // append built article to fragment
        article.appendChild(img);
        article.appendChild(articleDelButton);
        worksListFragment.appendChild(article);
        // event listener creation
        articleDelButton.addEventListener('click', () => {
            deleteWork(work);
        });
    }
    modalGalleryContent.insertBefore(worksListFragment,delimiter);
}