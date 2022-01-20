const year = new Date().getFullYear();
const content = "&copy; " + (year == 2021 ? "2021" : "2021-" + year) + " Automatic9045";
setHTMLByClasses(content, "footer-copyright");