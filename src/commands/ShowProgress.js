import AbstractCommand from "./AbstractCommand";
import * as discord from "discord.js";

class ShowProgress extends AbstractCommand {

	constructor(donations) {
		super();
		this.donations = donations;
	}

	commandWord() { return "progress"; }

	activateCommand(message) {
		let channel = message.channel;
		let progress = this.donations.moneyInBank();
		let leaderBoard = this.donations.getLeaderBoard("lires")
		let embed = new discord.RichEmbed();

		embed.setColor("FF5733");
		embed.setThumbnail("https://media.comicbook.com/2018/10/jojo-part-5-op-1138720-640x320.jpeg");

		embed.addField("Progress", "We have " + progress.toLocaleString() + " lire out of 10,000,000,000 lire.\nOnly " + (10000000000 - progress).toLocaleString() + " lire until I can get the rank of capo.");

		embed.addField("Passione top 3", "**1.** " + leaderBoard[0].displayName + " " + leaderBoard[0].goods.toLocaleString()
			+ " lire\n2. " + leaderBoard[1].displayName + " " + leaderBoard[1].goods.toLocaleString() + " lire\n2. " + leaderBoard[2].displayName + " " + leaderBoard[2].goods.toLocaleString()) + " lire";

		channel.send(embed);
	}

	usageDescription() {
		return this.commandWord();
	}

	commandDescription() {
		return "Shows how far I am to becoming a gang-star.";
	}
}

export default ShowProgress;