
// Initiate edition
function initGalleryEdition() {
    // Adding edit button
    console.log('addingbutton');
    const editButton = document.createElement('span');
    editButton.innerHTML='<i class="fa-regular fa-pen-to-square"></i>modifier';
    editButton.classList.add('portfolioEdit');
    document.getElementById('portfolio').querySelector('h2').appendChild(editButton);
    // Display modale onclick
    editButton.addEventListener('click', () => {
        console.log('detected');
    });
    
}