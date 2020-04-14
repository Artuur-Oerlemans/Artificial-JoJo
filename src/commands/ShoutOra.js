import AbstractCommand from "./AbstractCommand.js"

class ShoutOra extends AbstractCommand {
	commandWord() { return "ora"; }

	activateCommand(message) {
		let channel = message.channel;
		let timesNotParsed = message.content.split(' ')[1];
		let times = parseInt(timesNotParsed);

		if (timesNotParsed == "e" || timesNotParsed == "pi") {
			channel.send("なにィ！！");
			channel.send("そんなバカな！！");
		} else if (isNaN(times) || times == 0) {
			channel.send('だが断る');
		}
		else if (times > 665 || times < -665) {
			channel.send("Artificial JoJo: Discord, what does the scouter say about the character count?");
			channel.send("Discord: It's over 2000!!!");
		}
		else if (times == 4) {
			channel.send(this.boldRepetitive("オラ ", 5));
		}
		else if (times > 0) {
			channel.send(this.boldRepetitive("オラ ", times));
		}
		else if (times < 0) {
			channel.send(this.boldRepetitive("無駄 ", -times));
		}
	}

	// repeats the string in repeated a number of times in bold format
	boldRepetitive(text, times) {
		return "**" + text.repeat(times) + "**";
	}

	usageDescription() {
		return this.commandWord() + " {quantity}";
	}

	commandDescription() {
		return "ORA!";
	}
}

export default ShoutOra;