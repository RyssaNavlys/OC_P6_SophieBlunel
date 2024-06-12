// prepare modal-add
function prepareModalAdd() {
    const addForm = document.querySelector(".modal-add__content__form");
    // add categories if not
    const addFormCat = addForm.querySelector("select");
    if(addFormCat.children.length===1) {
        modalAddCategories(addFormCat);
    }

    // listen form change
    const addFormImg = addForm.querySelector("input[type=file]");
    const addFormTitle = addForm.querySelector("input[type=text]");
    const addFormSubmit = addForm.querySelector('.form__submit');
    addFormSubmit.addEventListener("click", (e) => e.preventDefault());
    addFormImg.addEventListener("change",() => {
        // Get data from form
        const formData = new FormData(addForm);
        const img = formData.get('image');
        // Display image in label
        const addFormImgLabel = addForm.querySelector('.modal-add__content__form__file-input');
        addFormImgLabel.innerHTML="";
        if(img.type.startsWith("image/")) {
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
        }
        // check form
        checkForm(formData,addFormSubmit);
    });
    addFormTitle.addEventListener("input",() => {
        console.log(addFormTitle);
        // Get data from form
        const formData = new FormData(addForm);
        // check input
        // check form
        checkForm(formData,addFormSubmit);

    });
    addFormCat.addEventListener("change",() => {
        console.log(addFormCat);
        // Get data from form
        const formData = new FormData(addForm);
        // check input
        // check form
        checkForm(formData,addFormSubmit);
    });
}

// add categories to modal-add form
function modalAddCategories(addFormCat) {
    fetch(host + "/categories").then(response => {
        if(response.status !== 200) {
            console.log("API : erreur lors de la récupération des catégories");
            return false;
        } else {
            return response.json();
        }
    }).then(categoriesList => {
        window.localStorage.setItem("categoriesFullList",JSON.stringify(categoriesList));
        // adding categories List as options in select
        for(let category of categoriesList) {
            let option = document.createElement('option');
            option.classList.add("form__select__option");
            option.value = category.id;
            option.innerHTML = category.name;
            addFormCat.appendChild(option);
        }
    });
}

function submitAddForm(event) {
    const addForm = document.querySelector(".modal-add__content__form");
    const formData = new FormData(addForm);
    addWork(formData);
}

// check form to activate or deactivate send button
function checkForm(formData,submitButton) {
    console.log(formData.get("title"));
    if(formData.get("image").name !== "" && formData.get("category") !== "" && formData.get("title") !== "") {
        console.log("activate button");
        submitButton.classList.remove("button--disabled");
        submitButton.classList.add("button--bg");
        submitButton.addEventListener('click', submitAddForm);
    } else {
        console.log("deactivate button");
        submitButton.classList.add("button--disabled");
        submitButton.classList.remove("button--bg");
        submitButton.removeEventListener('click',submitAddForm);
    }
}
