
class SeededRandom {
	constructor(seed) {
		this.seed = seed;
		if (isNaN(this.seed))
			throw "Given seed is not an integer.";
	}

	getNextRandom(max) {
		this.seed = this.seed * 16807 % 2147483647;
		return this.seed % max;
	}

	// consist of A B C D E
	getRandomGrade() {
		return this.intToUppercaseLetter(this.getNextRandom(5));
	}

	intToUppercaseLetter(integer) {
		return String.fromCharCode(65 + integer);
	}

}

export default SeededRandom;