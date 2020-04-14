import AbstractCommand from "./AbstractCommand.js"

class Garfield extends AbstractCommand {
	commandWord() { return "garfield"; }

	activateCommand(message) {
		let channel = message.channel;
		var randomDate = this.randomGarfieldDate();
		var year = randomDate.getFullYear();
		// +1 as on the Garfield site, the first month and day is 1 not 0.
		var month = this.padWithZeroes(randomDate.getMonth() + 1);
		var day = this.padWithZeroes(randomDate.getDay() + 1)

		channel.send(year + "-" + month + "-" + day, { files: ["https://d1ejxu6vysztl5.cloudfront.net/comics/garfield/" + year + "/" + year + "-" + month + "-" + day + ".gif"] });
	}

	randomGarfieldDate() {
		var firstGarfield = new Date(1978, 6, 19, 0, 0, 0, 0);
		return this.randomDate(firstGarfield, new Date());
	}

	randomDate(start, end) {
		var date = new Date(+start + Math.random() * (end - start));
		return date;
	}

	padWithZeroes(i, length = 2) {
		var output = i.toString()
		while (output.length < length)
			output = "0" + output;
		return output;
	}

	usageDescription() {
		return this.commandWord();
	}

	commandDescription() {
		return "Garfield.";
	}
}

export default Garfield;