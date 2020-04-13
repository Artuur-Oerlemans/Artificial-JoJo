import AbstractCommand from "./AbstractCommand";
import * as discord from "discord.js";

class Help extends AbstractCommand {
	
	static commandWord() { return "help"; }

	static activateCommand(message) {
		let channel = message.channel;
		let embed = new discord.RichEmbed();

		embed.setColor("FF5733");
		embed.setThumbnail("https://vignette.wikia.nocookie.net/jjba/images/a/ab/Joseph-oh-my-god.jpg/revision/latest?cb=20140807173126");

		embed.addField(";progress", "Shows how far I'm to becoming a gang-star");
		embed.addField(";introduce", "I, Artificial JoJo, will give a short introduction to my dream.");
		embed.addField(";my_stand", "Find out what your stand is.");
		embed.addField(";loaves_eaten", "Tell how old you are and it calculates how many loaves you have approximately eaten.");
		embed.addField(";ora", "Tell the amount of times you want ora");
		embed.addField(";countdown", "Tells how long until the next episode.");
		embed.addField(";taste_of_a", "What is this I'm tasting?\nExample: ;taste_of_a @user liar!");
		embed.addField("contribute!", "In order to fullfil my dream of become a gang-star I need doekoe.\nTo help, mention me with any form of money.")

		channel.send(embed);
	}

	static usageDescription() {
		return commandWord();
	}

	static commandDescription() {
		return "The command you used to get this text.";
	}
}

export default Help;