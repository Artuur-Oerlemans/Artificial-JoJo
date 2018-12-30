const NumberOfStandImages = 40;

class Stand {

    constructor(id) {
        console.log(id);
        this.initializeSeed(id);

        this.power = this.getRandomGrade();
        this.speed = this.getRandomGrade();
        this.range = this.getRandomGrade();
        this.durability = this.getRandomGrade();
        this.precision = this.getRandomGrade();
        this.learning = this.getRandomGrade();
        this.name = Stand.standNames[this.getNextRandom(Stand.standNames.length)];
        this.imageNumber = this.getNextRandom(NumberOfStandImages);
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

    initializeSeed(id) {
        this.seed = parseInt(id);
        if (isNaN(this.seed))
            throw "not an integer";
    }

    // javascript doesn't support random integers with seeds, so I made one myself.
    getNextRandom(max) {
        this.seed = this.seed * 16807 % 2147483647;
        return this.seed % max;
    }

    // consist of A B C D E
    getRandomGrade() {
        return intToUppercaseChar(this.getNextRandom(5));
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


function intToUppercaseChar(number) {
    if (isNaN(number) || !Number.isInteger(number))
        throw "not an integer";
    let alphabetNumber = ((number % 26) + 26) % 26;
    return String.fromCharCode(65 + alphabetNumber);
}

export default Stand;
