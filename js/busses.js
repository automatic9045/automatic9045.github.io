function getRandomBusNumbers(count = 1) {
	let busNumbers = ["0039", "F8926", "F8926", "F9001", "F9045", "F9045", "F9045", "9303", "9303", "9304", "9304", "9310", "9510", "9811", "9811", "0113", "0218", "0222",
		"9811", "9811", "9811", "9811", "9811", "9811", "9811", "9811", "9811", "9811", "9811", "9811", "9811", "9811", "9811", "9811", "9811", "9811"];
	const pickedBusNumbers = [];

	for (let i = 0; i < count; i++) {
		const j = Math.floor(Math.random() * busNumbers.length);
		const pickedBusNumber = busNumbers[j];

		busNumbers = busNumbers.filter(busNumber => busNumber != pickedBusNumber);
		pickedBusNumbers.push(pickedBusNumber);
	}

	return pickedBusNumbers;
}
