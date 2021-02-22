function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function include(path, elementId) {
	const xhr = new XMLHttpRequest();

	xhr.open("GET", path, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var responseText = xhr.responseText;
			document.getElementById(elementId).innerHTML = responseText;
		}
	};
	xhr.send();
}