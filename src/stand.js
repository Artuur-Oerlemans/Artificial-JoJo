class Stand {

    constructor(id) {
        console.log(id);
        this.initializeSeed(id);

        this.power = intToUppercaseChar(this.getNextRandom(5));
        this.speed = intToUppercaseChar(this.getNextRandom(5));
        this.range = intToUppercaseChar(this.getNextRandom(5));
        this.durability = intToUppercaseChar(this.getNextRandom(5));
        this.precision = intToUppercaseChar(this.getNextRandom(5));
        this.learning = intToUppercaseChar(this.getNextRandom(5));
    }

    tellStand(channel) {
        channel.send("**STATS**");
        channel.send("Power: **" + this.power + "**");
        channel.send("Speed: **" + this.speed + "**");
        channel.send("Range: **" + this.range + "**");
        channel.send("Durability: **" + this.durability + "**");
        channel.send("Precision: **" + this.precision + "**");
        channel.send("Learning: **" + this.learning + "**");
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
}


function intToUppercaseChar(number) {
    if (isNaN(number) || !Number.isInteger(number))
        throw "not an integer";
    let alphabetNumber = ((number % 26) + 26) % 26;
    return String.fromCharCode(65 + alphabetNumber);
}

export default Stand;
