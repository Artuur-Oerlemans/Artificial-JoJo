import * as fs from "fs";

class DonationRepository {
	constructor() {
		this.memory = require("../memory.json");
	}
}

export default DonationRepository;