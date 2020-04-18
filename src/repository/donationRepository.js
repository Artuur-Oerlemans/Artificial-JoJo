import * as fs from "fs";

var GOODS = "lires"

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
			return { id: key, displayName: this[key].displayName, goods: this[key][GOODS] ? this[key][GOODS] : 0 };
		}, contributors);
		leaderBoard.sort(function (p1, p2) { return p2.goods - p1.goods; });

		return leaderBoard;
	}

	// change the quantity of GOODS in the JSON file.
	updateInventory(contributor, change) {
		// update the inventory value
		let inBank = this.memory["inventory"][GOODS];
		let afterTransfer = inBank + change;
		this.memory["inventory"][GOODS] = afterTransfer;
		// register the contribution
		let displayName = contributor.lastMessage.member.displayName;
		console.log(displayName);
		// check if the user is already in the database or update display name
		if (!this.memory["contributors"][contributor.id]) {
			this.memory["contributors"][contributor.id] = { displayName: displayName };
		} else {
			this.memory["contributors"][contributor.id]["displayName"] = displayName;
		}

		// check if previous contributions have already with these GOODS
		let afterContribution = this.memory["contributors"][contributor.id][GOODS] ? this.memory["contributors"][contributor.id][GOODS] + change : change;

		this.memory["contributors"][contributor.id][GOODS] = afterContribution;

		// sync to memory.json
		fs.writeFile("./src/memory.json", JSON.stringify(this.memory, null, 4), err => {
			if (err) throw err;
			console.log(JSON.stringify(this.memory, null, 4));
		});
		return afterTransfer;
	}
}

export default DonationRepository;