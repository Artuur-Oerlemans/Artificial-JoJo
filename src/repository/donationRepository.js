import * as fs from "fs";

class DonationRepository {
	constructor() {
		this.memory = require("../memory.json");
	}

	moneyInBank() {
		return this.memory["inventory"].lires;
	}

	// return leaderboard with format: id, displayName and goods
	getRankedDonors() {
		let contributors = this.memory["contributors"];

		let leaderBoard = Object.keys(contributors).map(function (key) {
			return { id: key, displayName: this[key].displayName, goods: this[key]["lires"] ? this[key]["lires"] : 0 };
		}, contributors);
		leaderBoard.sort(function (p1, p2) { return p2.goods - p1.goods; });

		return leaderBoard;
	}
}

export default DonationRepository;