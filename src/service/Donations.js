import Currency from "../entities/Currency";

class Donations {

	constructor(donationRepository) {
		this.repository = donationRepository;
	}

	// check for donations
	takeAnyDonations(message) {
		let currency = Currency.detectCurrency(message.content);
		if (currency == null) return;

		if (currency.valueInLires > 0)
			message.channel.send(this.thankYouMessage(message.member.displayName));
		message.channel.send(currency.description);
		this.receiveDonation(message, currency.valueInLires);
	}

	// Donate lires
	receiveDonation(message, change) {
		let inBank = this.repository.moneyInBank()
		let afterTransfer = inBank;
		if (change != 0) {
			afterTransfer = this.repository.updateInventory(message, change);
		}

		message.channel.send(inBank + " lire => " + afterTransfer + " lire");
		this.tellRanking(message.channel, message.author);
	}

	tellRanking(channel, contributor) {
		let ranking = this.getRanking(contributor.id);
		channel.send("ranking: " + ranking);
	}

	thankYouMessage(displayName) {

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
			, "yare yare daze"
			, "yare yare dawa"
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