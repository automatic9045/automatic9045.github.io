function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function eval2(obj) {
	if (obj == "") return;
	return Function("\"use strict\"; return (() => {" + obj + "})()")();
}

function evalFromFile(path) {
	const xhr = new XMLHttpRequest();

	xhr.open("GET", path, false);
	xhr.onreadystatechange = (() => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			eval2(xhr.responseText);
		}
	});
	xhr.send();
}

function evalFromHTMLCollection(htmlCollection) {
	for (let i = 0; i < htmlCollection.length; i++) {
		const child = htmlCollection.item(i);
		if (child.nodeName == "SCRIPT") {
			if (child.src != null && child.src != "") evalFromFile(child.src);
			eval2(child.textContent);
		} else {
			evalFromHTMLCollection(child.children);
		}
	}
}

function include(path, element) {
	const xhr = new XMLHttpRequest();

	xhr.open("GET", path, false);
	xhr.onreadystatechange = (() => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			const response = xhr.responseText;
			element.innerHTML = response.replace("<meta name=\"robots\" content=\"noindex,nofollow\" />", "");
			
			evalFromHTMLCollection(element.children);
		}
	});
	xhr.send();
}

function includeById(path, elementId) {
	const element = document.getElementById(elementId);
	include(path, element);
}

function includeByClasses(path, elementClasses) {
	const elements = document.getElementsByClassName(elementClasses);
	if (elements.length == 1) {
		include(path, elements[0]);
	} else {
		Array.from(elements).forEach(element => include(path, element));
    }
}

function includeByClasses(path, elementClasses, index) {
	const element = document.getElementsByClassName(elementClasses)[index];
	include(path, element);
}

function setHTML(html, element) {
	element.innerHTML = html;
}

function setHTMLById(html, elementId) {
	const element = document.getElementById(elementId);
	setHTML(html, element);
}

function setHTMLByClasses(html, elementClasses, index) {
	const elements = document.getElementsByClassName(elementClasses);

	switch (arguments.length) {
		case 2:
			switch (elements.length) {
				case 0:
					console.error("Cannot find the class '" + elementClasses + "'");
					return;

				case 1:
					setHTML(html, elements[0]);
					break;

				default:
					Array.from(elements).forEach(element => {
						setHTML(html, element);
					});
					break;
			}
			break;

		case 3:
			setHTML(html, elements[index]);
			break;
    }
}

function getRandomBusNumber() {
	const busNumbers = ["F9045", "F9045", "F9045", "9304", "9304", "0039"];

	const i = Math.floor(Math.random() * busNumbers.length);
	return busNumbers[i];
}


/*--Global site tag(gtag.js) - Google Analytics--*/

evalFromFile("https://www.googletagmanager.com/gtag/js?id=UA-173968596-2");
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'UA-173968596-2');