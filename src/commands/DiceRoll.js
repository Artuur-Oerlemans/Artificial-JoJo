import AbstractCommand from "./AbstractCommand.js"

class DiceRoll extends AbstractCommand {
	commandWord() { return "roll"; }

	activateCommand(message) {
		let channel = message.channel;

		let commandRegex = new RegExp(this.commandWord() + '(.*)');
		let rollDescriptionWithSpaces = message.content.match(commandRegex)[1];
		channel.send(rollDescriptionWithSpaces);
		let rollDescription = rollDescriptionWithSpaces.replace(/\s/g, '');
		channel.send(rollDescription);

		let re = /(\d{0,4})d(\d{1,6})/;
		if (re.test(rollDescription)) {
			let values = rollDescription.match(re);
			channel.send(this.rollSidedDice(parseInt(values[2])));
		}
		else {
			channel.send('failed');
			channel.send(rollDescription);
			channel.send('(\d{0,4})d(\d{1,6})');
		}
	}

	rollSidedDice(sides) {
		return Math.floor(Math.random() * sides + 1);
	}

	usageDescription() {
		return this.commandWord() + " {number}d{sides}";
	}

	commandDescription() {
		return "dice roll(WIP)";
	}
}

export default DiceRoll;