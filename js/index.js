function prepareToFade() {
    if (Cookies.get("do-fade") != "1") {
        const loadingDiv = document.getElementById("loading");
        const bodyDiv = document.getElementById("body");

        loadingDiv.classList.add("will-fade");
        bodyDiv.classList.add("will-fade");
    }
}

async function fade() {
    const bodyDiv = document.getElementById("body");

    if (bodyDiv.classList.contains("will-fade")) {
        await wait(200);
        document.getElementById("loading-mes-loading").classList.add("fade");
        document.getElementById("loading-mes-welcome").classList.add("fade");
        bodyDiv.style.display = "block";
        await wait(500);
        bodyDiv.classList.add("fade");
        await wait(1500);
    }

    Cookies.set("do-fade", "1", { "expires": 2 });
}