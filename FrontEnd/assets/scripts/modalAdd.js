// import config file
import { host } from "./config.js";

// import required modules
import { addWork } from "./modalWindow_functions.js"

// prepare modal-add
export function prepareModalAdd() {
    const addForm = document.querySelector(".modal-add__content__form");
    // add categories if not
    const addFormCat = addForm.querySelector("select");
    if(addFormCat.children.length===1) {
        modalAddCategories(addFormCat);
    }

    // listen for change
    const addFormImg = addForm.querySelector("input[type=file]");
    const addFormTitle = addForm.querySelector("input[type=text]");
    const addFormSubmit = addForm.querySelector('.form__submit');
    addFormSubmit.addEventListener("click", (e) => e.preventDefault());
    addFormImg.addEventListener("change",() => {
        // Get data from form
        const formData = new FormData(addForm);
        const img = formData.get('image');
        // Display image in label (check if file type is image)
        const addFormImgLabel = addForm.querySelector('.modal-add__content__form__file-input');
        if(img.type.startsWith("image/") && img.size <= 4194304) {
            console.log(img.size);
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
        }
        // check form
        checkForm(formData,addFormSubmit);
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
    try {
        fetch(host + "/categories").then(response => {
            if(!response.ok) {
                throw "API : erreur lors de la récupération des catégories";
            } else {
                return response.json();
            }
        }).then(categoriesList => {
            window.sessionStorage.setItem("categoriesFullList",JSON.stringify(categoriesList));
            // adding categories List as options in select
            for(let category of categoriesList) {
                let option = document.createElement('option');
                option.classList.add("form__select__option");
                option.value = category.id;
                option.innerHTML = category.name;
                addFormCat.appendChild(option);
            }
        });
    } catch(errorMessage) {
        // API : silent error
        console.log(errorMessage);
    }
}

function submitAddForm(event) {
    const addForm = document.querySelector(".modal-add__content__form");
    const formData = new FormData(addForm);
    // add work to db + dynamically to galleries
    addWork(formData);
    // reset form
    addForm.reset();
    resetImgLabel(addForm);
}

function resetImgLabel(addForm) {
    const addFormImgLabel = addForm.querySelector('.modal-add__content__form__file-input');
    addFormImgLabel.innerHTML=` <i class="fa-regular fa-image modal-add__content__form__file-input__icon"></i>
						        <span class="modal-add__content__form__file-input__button">+ Ajouter photo</span>
						        <span class="modal-add__content__form__file-input__format">jpg, png : 4Mo max</span>`;
}

// check form to activate or deactivate send button
function checkForm(formData,submitButton) {
    if(formData.get("image").name !== "" && formData.get("image").type.startsWith("image/") && formData.get("category") !== "" && formData.get("title") !== "") {
        //console.log("activate button");
        submitButton.classList.remove("button--disabled");
        submitButton.classList.add("button--bg");
        submitButton.addEventListener('click', submitAddForm);
    } else {
        //console.log("deactivate button");
        submitButton.classList.add("button--disabled");
        submitButton.classList.remove("button--bg");
        submitButton.removeEventListener('click',submitAddForm);
    }
}
