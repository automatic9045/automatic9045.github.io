﻿let canvas;
let canvasContext;

let bus;
let timer;

let startTime;
let lastTime = 0;

let isWidthShort;
let busSpeed = 2000; // px/s
let lineSpeed = 0;
let busX;
let lineX = 0;

let hasBrakeCompleted = false;
let hasLoadCompleted = false;

function beginLoadAnimation() {
    window.addEventListener("touchmove", hideOverflow);

    canvas = document.getElementById("loading-road");
    canvas.width = window.innerWidth * 2;
    canvas.height = 108;
    canvas.style.width = canvas.width / 2 + "px";
    canvas.style.height = canvas.height / 2 + "px";
    canvasContext = canvas.getContext("2d");

    busX = canvas.width;
    lineX = canvas.width + 100;
    isWidthShort = canvas.width < 960;

    bus = document.createElement("canvas");
    bus.width = 326;
    bus.height = 100;
    const busContext = bus.getContext("2d");
    const busImage = new Image();
    busImage.src = "/img/bus_side_" + getRandomBusNumber() + ".svg";
    busImage.onload = () => {
        busContext.drawImage(busImage, 0, 0, bus.width, bus.height);
        startTime = Date.now();
        tick();
    }
}

function hideOverflow(e) {
    e.preventDefault();
}

function tick() {
    const now = Date.now();
    const fps = lastTime == 0 ? 60 : 1000 / (now - lastTime);
    lastTime = now;

    if (hasLoadCompleted) {
        busSpeed += 1000 / fps;
        lineSpeed += 1000 / fps;
    } else if (!hasBrakeCompleted) {
        busSpeed -= (isWidthShort ? 5 : 4) * (busSpeed - 100) / fps;

        if (busSpeed <= 110) {
            busSpeed = 100;
            hasBrakeCompleted = true;
        }
    }

    busX -= (isWidthShort ? busSpeed : busSpeed * 2) / fps;
    lineX -= (isWidthShort ? lineSpeed : lineSpeed * 2) / fps;

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.drawImage(bus, Math.round(busX), 0);
    canvasContext.fillStyle = "#80c0a0";
    canvasContext.fillRect(0, 100, Math.round(lineX), 4);
    canvasContext.fillStyle = "#2e3192";
    canvasContext.fillRect(0, 104, Math.round(lineX), 4);

    //document.getElementById("loading-bus-debug").innerHTML = x + "px<br>" + speed + "px/s<br>" + fps + "fps";

    if (busX < -500 && lineX < 0) {
        clearInterval(timer);
        return;
    }

    window.requestAnimationFrame(tick);
}

function prepareToFade() {
    const loadingDiv = document.getElementById("loading");
    const bodyDiv = document.getElementById("body");

    if (Cookies.get("do-fade") != "1") {
        loadingDiv.classList.add("will-fade");
        bodyDiv.classList.add("will-fade");
    } else {
        loadingDiv.classList.add("wont-fade");
        bodyDiv.classList.add("wont-fade");
    }
}

async function fade() {
    const bodyDiv = document.getElementById("body");

    if (bodyDiv.classList.contains("will-fade")) {
        await wait(200);
        Array.from(document.getElementsByClassName("loading-mes")).map(div => div.classList.add("fade"));
        bodyDiv.style.display = "block";
        await wait(500);
        hasLoadCompleted = true;
        window.removeEventListener("touchmove", hideOverflow);
        bodyDiv.classList.add("fade");
        await wait(1500);
    }

    Cookies.set("do-fade", "1", { "expires": 0.25 });
}