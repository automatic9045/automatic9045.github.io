const selectedBusNumbers = [];

selectedBusNumbers.push(setBusImage("footer-bus-body", selectedBusNumbers));
selectedBusNumbers.push(setBusImage("footer-bus-body-2", selectedBusNumbers));

function setBusImage(elementClassName, selectedBusNumbers) {
	const busNumber = (() => {
		while (true) {
			const _busNumber = getRandomBusNumber();
			if (!selectedBusNumbers.includes(_busNumber)) return _busNumber;
        }
	})();
	const elements = document.getElementsByClassName(elementClassName);

	switch (elements.length) {
		case 0:
			console.error("Cannot find the class '" + elementClassName + "'");
			return;

		case 1:
			elements[0].style.backgroundImage = "url('/img/bus_side/" + busNumber + ".svg')";
			break;

		default:
			Array.from(elements).forEach(element => {
				element.style.backgroundImage = "url('/img/bus_side/" + busNumber + ".svg')";
			});
			break;
	}

	return busNumber;
}