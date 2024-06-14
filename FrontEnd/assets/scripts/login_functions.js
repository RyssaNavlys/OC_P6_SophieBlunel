
// change menu login -> logout
export function changeLoginMenu() {
    const menuLinksList = document.querySelector('header nav ul').getElementsByTagName('a');
    // change link label
    let loginLink;
    for(let link of menuLinksList) {
        if(link.innerHTML === "login") {
            loginLink = link;
            link.innerHTML="logout";
            break;
        }
    };
    // change on click function
    loginLink.addEventListener('click', (mouseEvent) => {
        mouseEvent.preventDefault();
        window.sessionStorage.clear();
        window.location.reload();
    })
}