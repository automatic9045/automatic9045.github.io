const busNumber = getRandomBusNumber();
const elements = document.getElementsByClassName("footer-bus-body");

switch (elements.length) {
	case 0:
		console.error("Cannot find the class '" + elementClasses + "'");
		return;

	case 1:
		elements[0].style.backgroundImage = "url('/img/bus_side_" + busNumber + ".svg')";
		break;

	default:
		Array.from(elements).forEach(element => {
			element.style.backgroundImage = "url('/img/bus_side_" + busNumber + ".svg')";
		});
		break;
}