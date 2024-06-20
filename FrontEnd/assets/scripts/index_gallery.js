
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
        console.error(error);
    }
}

// function to add figures
function setupGallery(container,figuresList) {
    // prepare categoriesList
    const categoriesIdList = new Set(['Tous']); // get rid of duplicated data
    const categoriesList = [{'id':0,'name':'Tous'}];
    // Erase container content
    let figureHTML = document.createDocumentFragment();
    // adding works & categories dynamically
    for(let figure of figuresList) {
        // building elements
        let figureElement = document.createElement('figure');
        figureElement.setAttribute("id",figure.id);
        figureElement.setAttribute("data-category",figure.categoryId);
        let imgElement = document.createElement("img");
        imgElement.src = figure.imageUrl;
        imgElement.alt = figure.title;
        let captionElement = document.createElement("figcaption");
        captionElement.textContent = figure.title;
        // adding elements to fragment
        figureElement.appendChild(imgElement);
        figureElement.appendChild(captionElement);
        figureHTML.appendChild(figureElement);
        // create category if not in list
        if(!(categoriesIdList.has(figure.category.id))) {
            categoriesIdList.add(figure.category.id);
            categoriesList.push({'id':figure.category.id,'name':figure.category.name});
        }
    }
    // adding fragment in document
    container.innerHTML = "";
    container.appendChild(figureHTML);
    // return really used categories
    return categoriesList;
}

// function to add categories
function setupCategories(container,categoriesList,galleryContainer,worksList) {
    // Create every categories
    let categoriesFragment = document.createDocumentFragment();
    for(let category of categoriesList) {
        // Create button
        let categoryHtml = document.createElement('button');
        categoryHtml.classList.add('button','categories__button');
        categoryHtml.setAttribute('data-category',category.id);
        if(category.id===0) { categoryHtml.classList.add('button--bg'); }
        categoryHtml.textContent = category.name;
        categoriesFragment.appendChild(categoryHtml);
        // create event listener
        categoryHtml.addEventListener('click', (mousevent) => {
            selectCategoryButton(container,category);
            filterGallery(galleryContainer,worksList,category);
        });
    }
    // replace container content
    container.innerHTML="";
    container.appendChild(categoriesFragment);
}

// function to change filter
function selectCategoryButton(container,categoryToSelect) {
    // unselect previously selected category (categories)
    container.querySelectorAll('.button--bg').forEach((category) => {
        if(Number(category.dataset.category_id) !== categoryToSelect.id) {
            category.classList.remove('button--bg');
        }
    });
    // select right category (or "tous" if category Id doesn't exist)
    const filterToSelect = container.querySelector(`button[data-category='${categoryToSelect.id}']`);
    if(typeof(filterToSelect) === "undefined") {
        filterToSelect = container.querySelector(`button[data-category='0']`);
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
