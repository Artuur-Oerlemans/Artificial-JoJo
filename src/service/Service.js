﻿import * as discord from "discord.js";
import Currency from "../currency";
import Stand from "../stand";
import shoutOra from "../shoutOra";
import improveName from "../improveName";
import garfield from "../garfield";
import makeMeme from "../memeMaker";
import makeChristmas from "../christmasMaker";
import * as fs from "fs";
import LoavesEatenCommand from "../commands/LoavesEatenCommand";
import IntroductionCommand from "../commands/IntroductionCommand";
import HelpCommand from "../commands/HelpCommand";
import CountdownNextEpisodeCommand from "../commands/CountdownNextEpisodeCommand";

//the thing that should be infront of commands
const prefix = ";"

let memory = require("../memory.json");

class Service{

	executeCommands(message) {
		var args = message.content.substring(prefix.length).split(' ');
		var command = args[0];

		// now the first args will be the thing following the command
		args = args.splice(1);
    
		switch (command) {
			case 'introduce':
				IntroductionCommand.activateCommand(message);
				break;
			case 'loaves_eaten':
				LoavesEatenCommand.activateCommand(message);
				break;
			case 'my_stand':
				let stand = new Stand(message.author.id);
				stand.tellStand(message.channel);
				break;
			case 'ora':
				shoutOra(message.channel, args[0]);
				break;
			case "help":
				HelpCommand.activateCommand(message);
				break;
			case "progress":
				this.showProgress(message.channel);
				break;
			case "improve_name":
				improveName(message);
				break;
			case "garfield":
				garfield(message);
				break;
			case "countdown":
				CountdownNextEpisodeCommand.activateCommand(message);
				break;
			case "taste_of_a":
				makeMeme(message);
				break;
			case "taste_of_christmas":
				makeChristmas(message);
				break;
		}
		
		this.executeDonations(message);
	}

	showProgress(channel) {
		let progress = memory["inventory"].lires;
		let leaderBoard = this.getLeaderBoard("lires")
		let embed = new discord.RichEmbed();

		embed.setColor("FF5733");
		embed.setThumbnail("https://media.comicbook.com/2018/10/jojo-part-5-op-1138720-640x320.jpeg");

		embed.addField("Progress", "We have " + progress.toLocaleString() + " lire out of 10,000,000,000 lire.\nOnly " + (10000000000 - progress).toLocaleString() + " lire until I can get the rank of capo.");

		embed.addField("Passione top 3", "**1.** " + leaderBoard[0].displayName + " " + leaderBoard[0].goods.toLocaleString()
			+ " lire\n2. " + leaderBoard[1].displayName + " " + leaderBoard[1].goods.toLocaleString() + " lire\n2. " + leaderBoard[2].displayName + " " + leaderBoard[2].goods.toLocaleString()) + " lire";

		channel.send(embed);
	}

	// check for donations
	executeDonations(message) {
		let currency = Currency.detectCurrency(message.content);
		if (currency == null) return;

		if (currency.valueInLires > 0)
			message.channel.send(this.thankYouMessage(message.author));
		message.channel.send(currency.description);
		this.receiveDonation(message.author, message.channel, currency.valueInLires);


	}

	// Donate lires
	receiveDonation(contributor, channel, change) {
		let inBank = memory["inventory"].lires;
		let afterTransfer = inBank;
		if (change != 0) {
			afterTransfer = this.updateInventory(contributor, "lires", change);
		}

		channel.send(inBank + " lire => " + afterTransfer + " lire");
		this.tellRanking(channel, "lires", contributor);
	}

	tellRanking(channel, goods, contributor) {
		let ranking = this.getRanking(contributor.id, goods);
		channel.send("ranking: " + ranking.rank);
	}

	thankYouMessage(user) {
		let displayName = user.lastMessage.member.displayName;

		let responses = ["GURETO DESU-YO!"
			, "Naissu"
			, "Grazie"
			, "Berry naissu " + displayName + "-chan"
			, "Hey baby"
			, "OH MY GOD!!!"
			, "MUDA JANAI"
			, "Kore wa ii"
			, "*yEy!* Fine, Thank You!"
			, "Arigatou gozaimasu"
			, "GOURUDO EKUSUPERIENSU"
			, "At this rate we will be at 10,000,000,000 lire in now time"];
		let random = Math.floor(Math.random() * responses.length);

		return responses[random];
	}

	// change the quantity of a certain goods in the JSON file.
	updateInventory(contributor, goods, change) {
		// update the inventory value
		let inBank = memory["inventory"][goods];
		let afterTransfer = inBank + change;
		memory["inventory"][goods] = afterTransfer;
		// register the contribution
		let displayName = contributor.lastMessage.member.displayName;
		console.log(displayName);
		// check if the user is already in the database or update display name
		if (!memory["contributors"][contributor.id]) {
			memory["contributors"][contributor.id] = { displayName: displayName };
		} else {
			memory["contributors"][contributor.id]["displayName"] = displayName;
		}

		// check if previous contributions have already with these goods
		let afterContribution = memory["contributors"][contributor.id][goods] ? memory["contributors"][contributor.id][goods] + change : change;
  
		memory["contributors"][contributor.id][goods] = afterContribution;

		// sync to memory.json
		fs.writeFile("./src/memory.json", JSON.stringify(memory, null, 4), err => {
			if (err) throw err;
			console.log(JSON.stringify(memory, null, 4));
		});
		return afterTransfer;
	}

	// gets the ranking of a person for a certain goods
	getRanking(id, goods) {
		let leaderBoard = this.getLeaderBoard(goods);
		for (let rank = 1; rank <= leaderBoard.length; rank++) {
			if (leaderBoard[rank - 1].id == id)
				return { rank: rank, goods: leaderBoard[rank - 1].goods };
		}
		return { rank: leaderBoard.length, goods: 0 };
	}

	// return leaderboard with format: id, displayName and [goods]
	getLeaderBoard(goods) {
		let contributors = memory["contributors"];

		let leaderBoard = Object.keys(contributors).map(function (key) {
			return { id: key, displayName: this[key].displayName, goods: this[key][goods] ? this[key][goods] : 0 };
		}, contributors);
		leaderBoard.sort(function (p1, p2) { return p2.goods - p1.goods; });

		return leaderBoard;
	}
}

export default Service;