function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function eval2(obj) {
	if (obj == "") return;
	return Function("\"use strict\"; return (() => {" + obj + "})()")();
}

function evalFromFile(path) {
	const xhr = new XMLHttpRequest();

	xhr.open("GET", path, true);
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

	xhr.open("GET", path, true);
	xhr.onreadystatechange = (() => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			const response = xhr.responseText;
			response = response.replace("<meta name=\"robots\" content=\"noindex,nofollow\" />", "");
			element.innerHTML = response;
			
			evalFromHTMLCollection(element.children);
		}
	});
	xhr.send();
}

function includeById(path, elementId) {
	const element = document.getElementById(elementId);
	include(path, element);
}

function includeByClasses(path, elementClasses, index) {
	const element = document.getElementsByClassName(elementClasses)[index];
	include(path, element);
}


/*--Global site tag(gtag.js) - Google Analytics--*/

evalFromFile("https://www.googletagmanager.com/gtag/js?id=UA-173968596-2");
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'UA-173968596-2');