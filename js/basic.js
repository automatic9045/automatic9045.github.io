function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function include(path, element) {
	const xhr = new XMLHttpRequest();

	xhr.open("GET", path, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var responseText = xhr.responseText;
			element.innerHTML = responseText;
		}
	};
	xhr.send();
}

function includeById(path, elementId) {
	const element = document.getElementById(elementId);
	include(path, element);
}

function includeByClasses(path, elementClasses, index) {
	const element = document.getElementByClassName(elementClasses)[index];
	include(path, element);
}

function includeByClasses(path, elementClasses) {
	includeByClasses(path, elementClasses, 0);
}