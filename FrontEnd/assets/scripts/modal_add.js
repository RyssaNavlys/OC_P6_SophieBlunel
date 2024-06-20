// import config file
import { host } from "./config.js";

// import required modules
import { addWork } from "./modal_window.js"
import { hideError, showError } from "./utils.js";

// DOM elements
const addForm = document.querySelector(".modal-add__content__form");
const addFormImg = addForm.querySelector("input[type=file]");
const addFormImgLabel = addForm.querySelector('.modal-add__content__form__file-input');
const addFormTitle = addForm.querySelector("input[type=text]");
const addFormSubmit = addForm.querySelector('.form__submit');
const errorContainer = document.querySelector(".modal-add").querySelector(".error");

// prepare modal-add
export function prepareModalAdd() {
    // add categories if not
    const addFormCat = addForm.querySelector("select");
    if(addFormCat.children.length===1) {
        modalAddCategories(addFormCat);
    }
    // listen for change
    addFormSubmit.addEventListener("click", (e) => e.preventDefault());
    addFormImg.addEventListener("change",() => {
        // Get data from form
        const formData = new FormData(addForm);
        const img = formData.get('image');
        try{
            // Display image in label (check if file type is image)
            const addFormImgLabel = addForm.querySelector('.modal-add__content__form__file-input');
            if(img.type.startsWith("image/") && img.size <= 4194304) {
                hideError(errorContainer);
                addFormImgLabel.innerHTML="";
                let imgHtml = document.createElement('img');
                imgHtml.classList.add('modal-add__content__form__file-input__preview')
                imgHtml.setAttribute('alt','Photo à envoyer');
                imgHtml.file = img;
                addFormImgLabel.appendChild(imgHtml);
                const reader = new FileReader();
                reader.onload = (e) => {
                    imgHtml.src = e.target.result;
                };
                reader.readAsDataURL(img);
            } else {
                resetImgLabel(addForm);
                if(!img.type.startsWith("image/")) {
                    throw new Error("le format de l'image n'est pas pris en charge");
                } else if(img.size > 4194304) {
                    throw new Error("l'image est trop lourde");
                }
            }
        } catch(error) {
            showError(errorContainer,error);
        } finally {
            // check form
            checkForm(formData,addFormSubmit);
        }
    });
    addFormTitle.addEventListener("input",() => {
        // Get data from form
        const formData = new FormData(addForm);
        // check form
        checkForm(formData,addFormSubmit);
    });
    addFormCat.addEventListener("change",() => {
        // Get data from form
        const formData = new FormData(addForm);
        // check form
        checkForm(formData,addFormSubmit);
    });
}

// add categories to modal-add form
function modalAddCategories(addFormCat) {
    fetch(host + "/categories").then(response => {
        if(!response.ok) {
            throw new Error("API : erreur lors de la récupération des catégories");
        } else {
            return response.json();
        }
    }).then(categoriesList => {
        window.sessionStorage.setItem("categoriesFullList",JSON.stringify(categoriesList));
        // adding categories List as options in select
        let optionsList = document.createDocumentFragment();
        for(let category of categoriesList) {
            let option = document.createElement('option');
            option.classList.add("form__select__option");
            option.value = category.id;
            option.innerHTML = category.name;
            optionsList.appendChild(option);
        }
        addFormCat.appendChild(optionsList);
    })
    .catch((error) => {
        console.error(error);
    });
}

function submitAddForm(event) {
    const formData = new FormData(addForm);
    // add work to db + dynamically to galleries
    addWork(formData);
    // reset form
    addForm.reset();
    resetImgLabel(addForm);
}

function resetImgLabel(addForm) {
    addFormImgLabel.innerHTML=` <i class="fa-regular fa-image modal-add__content__form__file-input__icon"></i>
						        <span class="modal-add__content__form__file-input__button">+ Ajouter photo</span>
						        <span class="modal-add__content__form__file-input__format">jpg, png : 4Mo max</span>`;
}

// check form to activate or deactivate send button
function checkForm(formData,submitButton) {
    if(formData.get("image").name !== "" && formData.get("image").type.startsWith("image/") && formData.get("category") !== "" && formData.get("title") !== "") {
        //console.log("activate button");
        submitButton.classList.replace("button--disabled","button--bg");
        submitButton.addEventListener('click', submitAddForm);
    } else {
        //console.log("deactivate button");
        submitButton.classList.replace("button--bg","button--disabled");
        submitButton.removeEventListener('click',submitAddForm);
    }
}
