async function fade() {
    await wait(200);
    document.getElementById("loading-mes-loading").classList.add("fade");
    document.getElementById("loading-mes-welcome").classList.add("fade");
    const bodyDiv = document.getElementById("body");
    bodyDiv.style.display = "block";
    await wait(500);
    bodyDiv.classList.add("fade");
}