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
			afterTransfer = this.repository.updateInventory(contributor, "lires", change);
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