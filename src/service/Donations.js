import Currency from "../entities/Currency";
import * as fs from "fs";

class Donations {
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
		let inBank = this.moneyInBank()
		let afterTransfer = inBank;
		if (change != 0) {
			afterTransfer = this.updateInventory(contributor, "lires", change);
		}

		channel.send(inBank + " lire => " + afterTransfer + " lire");
		this.tellRanking(channel, "lires", contributor);
	}

	moneyInBank() {
		return Donations.memory["inventory"].lires;
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
			, "At this rate we will be at 10,000,000,000 lire in no time"];
		let random = Math.floor(Math.random() * responses.length);

		return responses[random];
	}

	// change the quantity of a certain goods in the JSON file.
	updateInventory(contributor, goods, change) {
		// update the inventory value
		let inBank = Donations.memory["inventory"][goods];
		let afterTransfer = inBank + change;
		Donations.memory["inventory"][goods] = afterTransfer;
		// register the contribution
		let displayName = contributor.lastMessage.member.displayName;
		console.log(displayName);
		// check if the user is already in the database or update display name
		if (!Donations.memory["contributors"][contributor.id]) {
			Donations.memory["contributors"][contributor.id] = { displayName: displayName };
		} else {
			Donations.memory["contributors"][contributor.id]["displayName"] = displayName;
		}

		// check if previous contributions have already with these goods
		let afterContribution = Donations.memory["contributors"][contributor.id][goods] ? Donations.memory["contributors"][contributor.id][goods] + change : change;

		Donations.memory["contributors"][contributor.id][goods] = afterContribution;

		// sync to memory.json
		fs.writeFile("./src/memory.json", JSON.stringify(Donations.memory, null, 4), err => {
			if (err) throw err;
			console.log(JSON.stringify(Donations.memory, null, 4));
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
		let contributors = Donations.memory["contributors"];

		let leaderBoard = Object.keys(contributors).map(function (key) {
			return { id: key, displayName: this[key].displayName, goods: this[key][goods] ? this[key][goods] : 0 };
		}, contributors);
		leaderBoard.sort(function (p1, p2) { return p2.goods - p1.goods; });

		return leaderBoard;
	}
}

Donations.memory = require("../memory.json");

export default Donations;