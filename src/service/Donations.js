import Currency from "../entities/Currency";
import * as fs from "fs";

class Donations {

	constructor(donationRepository) {
		this.repository = donationRepository;
	}

	// check for donations
	takeAnyDonations(message) {
		let currency = Currency.detectCurrency(message.content);
		if (currency == null) return;

		if (currency.valueInLires > 0)
			message.channel.send(this.thankYouMessage(message.author));
		message.channel.send(currency.description);
		this.receiveDonation(message.author, message.channel, currency.valueInLires);


	}

	// Donate lires
	receiveDonation(contributor, channel, change) {
		let inBank = this.repository.moneyInBank()
		let afterTransfer = inBank;
		if (change != 0) {
			afterTransfer = this.updateInventory(contributor, "lires", change);
		}

		channel.send(inBank + " lire => " + afterTransfer + " lire");
		this.tellRanking(channel, "lires", contributor);
	}

	tellRanking(channel, goods, contributor) {
		let ranking = this.getRanking(contributor.id);
		channel.send("ranking: " + ranking);
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
		let inBank = this.repository.memory["inventory"][goods];
		let afterTransfer = inBank + change;
		this.repository.memory["inventory"][goods] = afterTransfer;
		// register the contribution
		let displayName = contributor.lastMessage.member.displayName;
		console.log(displayName);
		// check if the user is already in the database or update display name
		if (!this.repository.memory["contributors"][contributor.id]) {
			this.repository.memory["contributors"][contributor.id] = { displayName: displayName };
		} else {
			this.repository.memory["contributors"][contributor.id]["displayName"] = displayName;
		}

		// check if previous contributions have already with these goods
		let afterContribution = this.repository.memory["contributors"][contributor.id][goods] ? this.repository.memory["contributors"][contributor.id][goods] + change : change;

		this.repository.memory["contributors"][contributor.id][goods] = afterContribution;

		// sync to memory.json
		fs.writeFile("./src/memory.json", JSON.stringify(this.repository.memory, null, 4), err => {
			if (err) throw err;
			console.log(JSON.stringify(this.repository.memory, null, 4));
		});
		return afterTransfer;
	}
	
	getRanking(id) {
		let leaderBoard = this.repository.getRankedDonors();
		let ranking = 1;

		for (; ranking <= leaderBoard.length; ranking++) {
			if (leaderBoard[ranking - 1].id == id)
				break;
		}

		return ranking;
	}
}

export default Donations;