function menuOnload() {
    function changeParentHeight() {
        menuIFrame.style.height = elm.contentWindow.document.body.scrollHeight + "px";
    }

    const menuIFrames = document.getElementsByClassName("menu");
    const menuIFrame = menuIFrames.length > 1 ? document.getElementsByClassName("menu smartphone")[0] : menuIFrames[0];

    let timer = 0;
    menuIFrame.contentWindow.onresize = (() => {
        if (timer > 0) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => changeParentHeight(), 100);
    });
}