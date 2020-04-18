import SeededRandom from "../helpers/SeededRandom";

const NumberOfStandImages = 40;

class Stand {

	constructor(id) {
		let seededRandom = new SeededRandom(parseInt(id));

		this.power = seededRandom.getRandomGrade();
		this.speed = seededRandom.getRandomGrade();
		this.range = seededRandom.getRandomGrade();
		this.durability = seededRandom.getRandomGrade();
		this.precision = seededRandom.getRandomGrade();
		this.learning = seededRandom.getRandomGrade();

		this.name = Stand.standNames[seededRandom.getNextRandom(Stand.standNames.length)];
		this.imageNumber = seededRandom.getNextRandom(NumberOfStandImages);
	}

	tellStand(channel) {
		channel.send("**STAND NAME: **" + this.name);
		channel.send({ files: ["./standImages/" + this.imageNumber + ".png"] });
		channel.send("**STATS**"
			+ "\nPower: **" + this.power + "**"
			+ "\nSpeed: ** " + this.speed + " ** "
			+ "\nRange: **" + this.range + "**"
			+ "\nDurability: **" + this.durability + "**"
			+ "\nPrecision: **" + this.precision + "**"
			+ "\nLearning: **" + this.learning + "**");
	}
}

Stand.standNames = [
	"Plastic Love"
	, "Comfortably Numb"
	, "High Voltage"
	, "Purple Rain"
	, "Radar Love"
	, "Space Jam"
	, "Jeugd van Tegenwoordig"
	, "Breakbot"
	, "Stille Willem"
	, "NGGYU"
	, "Sweet Victory"
	, "Fijn Uitgedoste Barbaar"
	, "Lazy Town"
	, "DMX"
	, "de Bier Man"
	, "De Topper"
	, "Toy-Box"
	, "Gerard Joling"
	, "Eiffel 65"
	, "Daddy Cool"
	, "Du Hast Mich"
	, "All Star"
	, "Chocolate Rain"
	, "Despacito"
	, "Gucci Gang"
	, "Man's Not Hot"
	, "Quick Math"
	, "Tunak Tunak Tun"
	, "NanaSui"
	, "Numa Numa"
	, "Darude Standstorm"
	, "Seinfeld Theme"
	, "Smash Mouth"
	, "Deja Vu"
	, "ONE OK ROCK"
	, "Man Out Of You"
	, "High School Musical"
	, "Mr. Blue Sky"
	, "ＹＯＵ　は　ＳＨＯＣＫ"
	, "Crazy Frog"
	, "Ocean Man"
	, "Hotline Bling"
	, "Snoop Dog"
	, "Mr. Clean"
];

export default Stand;