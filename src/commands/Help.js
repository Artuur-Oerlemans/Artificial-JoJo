import AbstractCommand from "./AbstractCommand";
import * as discord from "discord.js";

class Help extends AbstractCommand {

	constructor(commands) {
		super();
		this.commands = commands;
	}
	
	commandWord() { return "help"; }

	usageDescription() {
		return this.commandWord();
	}

	commandDescription() {
		return "The command you used to get this text.";
	}

	activateCommand(message) {
		let channel = message.channel;
		let embed = this.makeFancyEmbed();

		this.addHelpText(embed);

		channel.send(embed);
	}

	makeFancyEmbed() {
		let embed = new discord.RichEmbed();

		embed.setColor("FF5733");
		embed.setThumbnail("https://vignette.wikia.nocookie.net/jjba/images/a/ab/Joseph-oh-my-god.jpg/revision/latest?cb=20140807173126");

		return embed;
	}

	addHelpText(embed) {
		let commandsArray = this.commands.getArray();
		commandsArray
			.forEach(cmd => embed.addField(";" + cmd.usageDescription(), cmd.commandDescription()));

		embed.addField("contribute!", "In order to fullfil my dream of become a gang-star I need doekoe.\nTo help, mention me with any form of money.")
	}
}

export default Help;