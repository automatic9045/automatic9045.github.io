const year = new Date().getFullYear();
const content = "&copy; " + (year == 2021 ? "2021" : "2021-" + year) + " automatic9045";
setHTMLByClasses(content, "footer-basic-copyright");