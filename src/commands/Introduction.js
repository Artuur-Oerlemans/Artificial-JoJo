import AbstractCommand from "./AbstractCommand";

class Introduction extends AbstractCommand {

	// javascript won't allow normal class variables
	commandWord() { return "introduce"; }

	activateCommand(message) {
		let channel = message.channel;

		channel.send("I, Artificial JoJo, have a dream!");
		channel.send("I want to become a gang-star.");
		channel.send("To do so I have to reach the rank of capo.");
		channel.send("Will YOU help me gather 10,000,000,000 lire?");
	}

	usageDescription() {
		return this.commandWord();
	}

	commandDescription() {
		return "I, Artificial JoJo, will give a short introduction to my dream.";
	}
}

export default Introduction;