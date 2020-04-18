import AbstractCommand from "./AbstractCommand";
import * as discord from "discord.js";

class Help extends AbstractCommand {

	constructor(commands) {
		super();
		this.commands = commands;
	}
	
	commandWord() { return "help"; }

	activateCommand(message) {
		let channel = message.channel;
		let embed = new discord.RichEmbed();

		embed.setColor("FF5733");
		embed.setThumbnail("https://vignette.wikia.nocookie.net/jjba/images/a/ab/Joseph-oh-my-god.jpg/revision/latest?cb=20140807173126");

		let commandsArray = this.commands.getArray();
		commandsArray
			.forEach(cmd => embed.addField(";" + cmd.usageDescription(), cmd.commandDescription()));
		
		embed.addField(";taste_of_a {@user} {liar!}", "What is this I'm tasting?\nExample: ;taste_of_a @user liar!");
		embed.addField("contribute!", "In order to fullfil my dream of become a gang-star I need doekoe.\nTo help, mention me with any form of money.")

		channel.send(embed);
	}

	usageDescription() {
		return this.commandWord();
	}

	commandDescription() {
		return "The command you used to get this text.";
	}
}

export default Help;