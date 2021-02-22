function footer() {
    const year = new Date().getFullYear();
    document.getElementById("copyright").innerHTML = "&copy; " + (year == 2021 ? "2021" : "2021 - " + year) + " Automatic9045";
}