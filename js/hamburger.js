function changeMenuVisibility() {
    const menuButton = document.getElementById("menu-button");
    const menuContent = document.getElementById("menu-content");

    if (menuButton.classList.contains("visible")) {
        menuButton.classList.remove("visible");
        menuContent.classList.remove("visible");
    } else {
        menuButton.classList.add("visible");
        menuContent.classList.add("visible");
    }
}