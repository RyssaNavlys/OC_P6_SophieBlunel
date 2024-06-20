// import config
import { host } from './config.js';

// import error function
import { error } from "./utils.js";


// updating gallery
export function updateGallery() {
    try {
        let worksList = JSON.parse(window.sessionStorage.getItem("worksList"));
        if(!Array.isArray(worksList)) {
            throw new Error('updateGallery : Aucune donnée à afficher');
        }
        // Define gallery and categories filters containers
        const galleryContainer = document.getElementById("portfolio").querySelector(".gallery");
        const categoriesContainer = document.querySelector(".categories");
        // Setup gallery with entire works list => return categories list
        const categoriesList = setupGallery(galleryContainer,worksList);
        // Setup filters (display categories + setup events listeners)
        let catList = window.sessionStorage.getItem("categoriesList");
        if(catList !== JSON.stringify(categoriesList)) {
            window.sessionStorage.setItem('categoriesList',JSON.stringify(categoriesList));
        }
        setupCategories(categoriesContainer,categoriesList,galleryContainer,worksList);
    } catch(error) {
        // API : invisible error
        console.log(error);
    }
}

// function to add figures
function setupGallery(container,figuresList) {
    // prepare categoriesList
    const categoriesIdList = new Set(['Tous']); // get rid of duplicated data
    const categoriesList = [{'id':0,'name':'Tous'}];
    // Erase container content
    container.innerHTML = "";
    // adding works & categories dynamically
    for(let figure of figuresList) {
        let figureHTML = document.createElement("figure");
        figureHTML.setAttribute("id","work-" + figure.id);
        figureHTML.setAttribute("data-categories",figure.categoryId);
        figureHTML.innerHTML = `<img src="${figure.imageUrl}" alt="${figure.title}">
                                <figcaption>${figure.title}</figcaption>`;
        container.appendChild(figureHTML);
        // create category if not in list
        if(!(categoriesIdList.has(figure.category.id))) {
            categoriesIdList.add(figure.category.id);
            categoriesList.push({'id':figure.category.id,'name':figure.category.name});
        }
    }
    return categoriesList;
}

// function to add categories
function setupCategories(container,categoriesList,galleryContainer,worksList) {
    // erase container content
    container.innerHTML="";
    // Create every categories
    for(let category of categoriesList) {
        // Create button
        let categoryHtml = document.createElement('button');
        categoryHtml.classList.add('button','categories__button');
        categoryHtml.setAttribute('data-category_id',category.id);
        if(category.id===0) { categoryHtml.classList.add('button--bg'); }
        categoryHtml.innerHTML = category.name;
        container.appendChild(categoryHtml);
        // create event listener
        categoryHtml.addEventListener('click', mousevent => {
            selectCategory(container,category);
            filterGallery(galleryContainer,worksList,category);
        });
    }
}

// function to change filter
function selectCategory(container,categoryToSelect) {
    // unselect previously selected category (categories)
    container.querySelectorAll('.button--bg').forEach((category) => {
        if(Number(category.dataset.category_id) !== categoryToSelect.id) {
            category.classList.remove('button--bg');
        }
    });
    // select right category (or "tous" if category Id doesn't exist)
    const filterToSelect = container.querySelector(`button[data-category_id='${categoryToSelect.id}']`);
    if(typeof(filterToSelect) === "undefined") {
        filterToSelect = container.querySelector(`button[data-category_id='0']`);
    }
    filterToSelect.classList.add('button--bg');
}

// Filter gallery : hide non-filtered works
function filterGallery(container,worksList,category) {
    // Reset filter : category.id = 0
    if(category.id === 0) { setupGallery(container, worksList); }
    else {
        // Getting filtered elements
        const filteredWorksList = worksList.filter((work) => work.categoryId === category.id);
        // Reload setupGallery
        setupGallery(container, filteredWorksList);
    }
}
