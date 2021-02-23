const year = new Date().getFullYear();
const element = document.createElement("span");
const content = "&copy; " + (year == 2021 ? "2021" : "2021 - " + year) + " Automatic9045";
element.innerHTML = content;
const scripts = document.getElementsByTagName('script');
scripts[scripts.length - 1].parentNode.appendChild(element);