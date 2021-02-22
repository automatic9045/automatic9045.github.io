function changeMenuVisibility() {
    const menuButton = document.getElementsByClassName("menu-button")[0];
    const menuContent = menuButton.parentElement.getElementsByClassName("menu-content")[0];

    if (menuButton.classList.contains("visible")) {
        menuButton.classList.remove("visible");
        menuContent.classList.remove("visible");
    } else {
        menuButton.classList.add("visible");
        menuContent.classList.add("visible");
    }
}