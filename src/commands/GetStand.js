import AbstractCommand from "./AbstractCommand.js";
import Stand from "../entities/stand";

class GetStand extends AbstractCommand {
	commandWord() { return "my_stand"; }

	activateCommand(message) {
		let channel = message.channel;
		let stand = new Stand(message.author.id);

		stand.tellStand(channel);
	}

	usageDescription() {
		return this.commandWord();
	}

	commandDescription() {
		return "Find out what your stand is.";
	}
}

export default GetStand;