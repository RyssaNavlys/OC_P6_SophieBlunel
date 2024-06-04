// Global API host path
const host = "http://localhost:5678/api";

// Initialization on body load
function initializeApp() {
    // Load works from API
    fetch(host + "/works")
        .then(response => {
            console.log(response.status); // tester le status
            return response.json();
        })
        //
        .then(works_list => {
            console.log(works_list);
            // erase works container
            const gallery_container = document.getElementById("portfolio").querySelector(".gallery");
            gallery_container.innerHTML = "";
            // adding works dynamically
            for(let figure of works_list) {
                let figureHTML = document.createElement("figure");
                figureHTML.setAttribute("id","work-" + figure.id);
                figureHTML.setAttribute("data-categories",figure.categoryId);
                figureHTML.innerHTML = `<img src="${figure.imageUrl}" alt="${figure.title}">
                                        <figcaption>${figure.title}</figcaption>`;
                gallery_container.appendChild(figureHTML);
            }
        });

}


initializeApp();