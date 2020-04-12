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

//the thing that should be infront of commands
const prefix = ";"

class Service{

	executeCommands(message) {
		var args = message.content.substring(prefix.length).split(' ');
		var cmd = args[0];

		// now the first args will be the thing following the command
		args = args.splice(1);
    
		switch (cmd) {

			case 'introduce':
				this.showIntroduction(message.channel);
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
				this.showHelp(message.channel);
				break;
			case "progress":
				this.showProgress(message.channel, message.client.memory);
				break;
			case "improve_name":
				improveName(message);
				break;
			case "garfield":
				garfield(message);
				break;
			case "countdown":
				this.showCountdownNextEpisode(message.channel);
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

	showIntroduction(channel) {
		channel.send("I, Artificial JoJo, have a dream");
		channel.send("I want to become a gang-star");
		channel.send("Hence have to attain the rank of capo");
		channel.send("Will YOU help me gather 10,000,000,000 lire?");
	}

	showHelp(channel) {
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

	showCountdownNextEpisode(channel) {
		let now = new Date();
		let nextEpisodeDate = this.getNextDate(5, 19);
		channel.send("NEVER\nGo read the manga!");
		//channel.send(this.differenceDatesDHHMMSS(now, nextEpisodeDate)
		//    + " until the next episode of JoJo's bizarre adventure part 5: Golden Wind.");
	}

	// gets the next time that it is that day and hour. 
	// Sunday = 0
	getNextDate(day, hour) {
		let now = new Date();
		let nextTime = new Date();
		//go to correct day of the week
		nextTime.setDate(nextTime.getDate() + (day + 7 - nextTime.getDay()) % 7);
		//if that is after the hour, go to next week.
		if (now.getDay() == day && now.getHours() > hour - 1) {
			nextTime.setDate(nextTime.getDate() + 7);
		}
		// set to the correct hour
		nextTime.setHours(hour);
		nextTime.setMinutes(0);
		nextTime.setSeconds(0);

		return nextTime;
	}

	differenceDatesDHHMMSS(date1, date2) {
		let output = "";
		let differenceMilliseconds = date2.getTime() - date1.getTime();

		let oneSecond = 1000;
		let oneMinute = 60 * oneSecond;
		let oneHour = 60 * oneMinute;
		let oneDay = 24 * oneHour;

		let seconds = Math.floor((differenceMilliseconds / oneSecond) % 1000);
		let minutes = Math.floor((differenceMilliseconds / oneMinute) % 60);
		let hours = Math.floor((differenceMilliseconds / oneHour) % 24);
		let days = Math.floor(differenceMilliseconds / oneDay);

		if (days == 1) {
			output += days + " day and "
		} else if (days > 1) {
			output += days + " days and "
		}
		output += this.twoDigits(hours) + ":" + this.twoDigits(minutes) + ":" + this.twoDigits(seconds);
		return output;
	}

	twoDigits(number) {
		return ('0' + number).slice(-2);
	}

	showProgress(channel, memory) {
		let progress = memory["inventory"].lires;
		let leaderBoard = this.getLeaderBoard("lires", memory)
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
		this.receiveDonation(message.author, message.channel, currency.valueInLires, message.client.memory);


	}

	// Donate lires
	receiveDonation(contributor, channel, change, memory) {
		let inBank = memory["inventory"].lires;
		let afterTransfer = inBank;
		if (change != 0) {
			afterTransfer = this.updateInventory(contributor, "lires", change, memory);
		}

		channel.send(inBank + " lire => " + afterTransfer + " lire");
		this.tellRanking(channel, "lires", contributor, memory);
	}

	tellRanking(channel, goods, contributor, memory) {
		let ranking = this.getRanking(contributor.id, goods, memory);
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
	updateInventory(contributor, goods, change, memory) {
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
	getRanking(id, goods, memory) {
		let leaderBoard = this.getLeaderBoard(goods, memory);
		for (let rank = 1; rank <= leaderBoard.length; rank++) {
			if (leaderBoard[rank - 1].id == id)
				return { rank: rank, goods: leaderBoard[rank - 1].goods };
		}
		return { rank: leaderBoard.length, goods: 0 };
	}

	// return leaderboard with format: id, displayName and [goods]
	getLeaderBoard(goods, memory) {
		let contributors = memory["contributors"];

		let leaderBoard = Object.keys(contributors).map(function (key) {
			return { id: key, displayName: this[key].displayName, goods: this[key][goods] ? this[key][goods] : 0 };
		}, contributors);
		leaderBoard.sort(function (p1, p2) { return p2.goods - p1.goods; });

		return leaderBoard;
	}
}

export default Service;