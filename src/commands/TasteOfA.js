import AbstractCommand from "./AbstractCommand";
import makeMeme from "./encapsulatedCode/memeMaker";

class TasteOfA extends AbstractCommand {
	commandWord() { return "taste_of_a"; }

	activateCommand(message) {
		makeMeme(message);
	}

	usageDescription() {
		return this.commandWord() + " {@user} {liar!}";
	}

	commandDescription() {
		return "What is this I'm tasting?";
	}
}

export default TasteOfA;