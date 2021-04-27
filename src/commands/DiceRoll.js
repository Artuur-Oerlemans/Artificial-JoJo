import AbstractCommand from "./AbstractCommand.js"
import DiceTreeRoot from "../entities/DiceTree";

class DiceRoll extends AbstractCommand {
	commandWord() { return "roll"; }

	activateCommand(message) {
		let channel = message.channel;

		let commandRegex = new RegExp(this.commandWord() + '(.*)');
		let rollDescriptionWithSpaces = message.content.match(commandRegex)[1];
		let diceRollDescription = rollDescriptionWithSpaces.replace(/\s/g, '');

		let diceTreeRoot = new DiceTreeRoot(diceRollDescription);
		channel.send("max value: " + diceTreeRoot.getMaxValue());

		//let re = /(\d{0,4})d(\d{1,6})/;
		//if (re.test(diceRollDescription)) {
		//	let values = diceRollDescription.match(re);
		//	channel.send(this.rollSidedDice(parseInt(values[2])));
		//}
		//else {
		//	channel.send('failed');
		//	channel.send(diceRollDescription);
		//	channel.send('(\d{0,4})d(\d{1,6})');
		//}
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