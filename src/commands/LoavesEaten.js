import AbstractCommand from "./AbstractCommand.js"

class LoavesEaten extends AbstractCommand {
	commandWord() { return "loaves_eaten"; }

	activateCommand(message) {
		let channel = message.channel;
		let yearsUnfiltered = message.content.split(' ')[1];
		// adds this emoji to our memory 
		let menacing = message.client.emojis.cache.find(emoji => emoji.name === "menacing");

		let years = parseInt(yearsUnfiltered);
		if (isNaN(years) || years < 0) {
			channel.send('グッ');
		} else {
			channel.send(menacing.toString() + ' You have eaten about ' + Math.floor(60.3 * years) + ' loaves in your life.' + menacing.toString());
		}
	}

	usageDescription() {
		return this.commandWord() + " {age in years}";
	}

	commandDescription() {
		return "Calculates how many loaves you have approximately eaten.";
	}
}

export default LoavesEaten;