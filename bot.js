const discord = require('discord.js');

var client = new discord.Client();

const token = "NTE4MzQ0Mjg3NTU0MTA5NDUw.DuQYpw.Ibtms2TwuW1agDtb2-tQ-HL9Jl4";

const fs = require("fs");
client.memory = require("./memory.json");

client.on("ready", () => {
    console.log("ready");


    client.user.setActivity("Oh, That's A Baseball!", { type: "PLAYING" });
});

//the thing that should be infront of commands
const prefix = ";"

client.on("message", (message) => {

    // make certain the bot doesn't fall into a loop with another bot.
    if (message.author.bot) return;

    // check if a command was used
    if (message.content[0] == prefix) {
        executeCommands(message);
        return;
    }

    // respond to personal things
    if (message.mentions.users.array().length == 1 && message.mentions.users.first().id == 518344287554109450) {
        executeDonations(message);
    }

});

function executeCommands(message) {
    var args = message.content.substring(prefix.length).split(' ');
    var cmd = args[0];

    // now the first args will be the thing following the command
    args = args.splice(1);

    switch (cmd) {

        case 'introduce':

            message.channel.send("I, Artificial JoJo, have a golden dream \nI want to become a gang-star \nHence have to attain the rank of capo \nWill YOU help me gather 10,000,000,000 lire?");
            break;
            // approximates the number of loaves you would have eaten in your life
        case 'loaves_eaten':
            // adds this emoji to our memory 
            let menacing = client.emojis.find(emoji => emoji.name === "menacing");
            let years = parseInt(args[0]);
            if (isNaN(years) || years < 0) {
                message.channel.send('グッ');
            } else {
                message.channel.send(menacing.toString() + ' You have eaten about ' + Math.floor(60.3 * years) + ' loaves in your life.' + menacing.toString());
            }
            break;

        case 'ora':
            ora(message.channel, args[0]);
            break;
        // shows the possible commands
        case "help":
            embed = new discord.RichEmbed();
            embed.setColor("FF5733");
            embed.setThumbnail("https://vignette.wikia.nocookie.net/jjba/images/a/ab/Joseph-oh-my-god.jpg/revision/latest?cb=20140807173126");

            embed.addField(";progress", "Show how far I'm at becoming a gang-star");
            embed.addField(";introduce", "I, Artificial JoJo, will give a short introduction to my golden dream.");
            embed.addField(";loaves_eaten", "Give how old you are and it calculates how many loaves you have eaten.");
            embed.addField(";ora", "Give the amount of times you want ora");
            embed.addField("contribute!", "In order to fullfil my dream of become a gang-star I need doekoe.\nMention me with any form of money to help me.")


            message.channel.send(embed);

            break;
        case "progress":
            embed = new discord.RichEmbed();
            embed.setColor("FF5733");
            embed.setThumbnail("https://media.comicbook.com/2018/10/jojo-part-5-op-1138720-640x320.jpeg");

            let progress = client.memory["inventory"].lires;

            embed.addField("Progress", "We have " + progress.toLocaleString() + " lire out of 10,000,000,000 lire.\nOnly " + (10000000000 - progress).toLocaleString() + " lire until I can get the rank of capo.");

            // Get the top 3 contributors
            let contributors = client.memory["contributors"];
            let leaderBoard = Object.keys(contributors).map(function (key) {
                return { displayName: this[key].displayName, lires: this[key].lires };
            }, contributors);
            leaderBoard.sort(function (p1, p2) { return p2.lires - p1.lires; });
            let topThree = leaderBoard.slice(0, 3);

            embed.addField("Passione top 3", "**1.** " + topThree[0].displayName + " " + topThree[0].lires.toLocaleString()
                + " lire\n2. " + topThree[1].displayName + " " + topThree[1].lires.toLocaleString() + " lire\n2. " + topThree[2].displayName + " " + topThree[2].lires.toLocaleString()) + " lire";

            message.channel.send(embed);
            break;
    }
    executeDonations(message);
}

// check for donations
function executeDonations(message) {
    let currency = Currency.detectCurrency(message.content);
    if (currency == null) return;

    if (currency.valueInLires > 0)
        message.channel.send(thankYouMessage(message.author));
    message.channel.send(currency.description);
    receiveDonation(message.author, message.channel, currency.valueInLires);

}

class Currency {
    
    constructor(identifiers, description, valueInLires) {
        this.identifiers = identifiers;
        this.description = description;
        this.valueInLires = valueInLires;
    }

    // in a given string it detects if a currency is mentioned
    static detectCurrency(text) {
        // goes over all different currencies
        for (let currency of Currency.allCurrencies) {
            // check all possible identifiers for a currency, as example "💲"
            for (let identifier of currency.identifiers)
                if (text.includes(identifier)) {
                    return currency;
                }
        }

        return null;
    }
}

// collection of all possible currencies.
Currency.allCurrencies = [
    new Currency([":pound:", "💷"], "The value of 1 pound is 3097 lire", 3097),
    new Currency([":euro:", "💶"], "The value of 1 euro is 1936 lire", 1936),
    new Currency([":dollar:", "💵", ":heavy_dollar_sign: ", "💲"], "The value of 1 dollar is 1702 lire", 1702),
    new Currency([":yen:", "💴"], "The value of 1 yen is 16 lire", 16),
    new Currency([":money_with_wings:", "💸"], "*Th-The money is flying?!*\nゴ ゴ ゴ ゴ ゴ \nＴＨＩＳ 　ＭＵＳＴ 　ＢＥ 　ＴＨＥ 　ＷＯＲＫ 　ＯＦ 　ＡＮ 　ＥＮＥＭＹ 「ＳＴＡＮＤ」！！\nゴ ゴ ゴ ゴ ゴ ", 0),
    new Currency([":gem:", "💎"], "*Cr-crazy diamondo?!*\nゴ ゴ ゴ ゴ ゴ \nＴＨＩＳ 　ＭＵＳＴ 　ＢＥ 　ＡＮ 　ＥＮＥＭＹ 「ＳＴＡＮＤ」！！\nゴ ゴ ゴ ゴ ゴ ", 0),
    new Currency([":credit_card: ", "💳"], "Sorry, we don't accept credit cards", 0),
    new Currency([":moneybag:", "💰"], "Ah, a jute bag with a dollar sign. \nThanks?", 0),
    new Currency([":banana:", "🍌"], "*Chooses to stay at a safe distance.*", 0)
]

// Donate lires
function receiveDonation(contributor, channel, change) {
    let inBank = client.memory["inventory"].lires;
    let afterTransfer = updateInventory(contributor, "lires", change);

    channel.send(inBank + " lire => " + afterTransfer + " lire");
}

function thankYouMessage(user) {
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
        , "Arigotou gozaimasu"
        , "GOURUDO EKUSUPERIENSU"
        , "At this rate we will be at 10,000,000,000 lire in now time"];
    let random = Math.floor(Math.random() * responses.length);

    return responses[random];
}


// change the quantity of a certain goods in the JSON file.
function updateInventory(contributor, goods, change) {
    // update the inventory value
    let inBank = client.memory["inventory"][goods];
    let afterTransfer = inBank + change;
    client.memory["inventory"][goods] = afterTransfer;

    // register the contribution
    let displayName = contributor.lastMessage.member.displayName;

    // check if the user is already in the database
    if (!client.memory["contributors"][contributor.id])
        client.memory["contributors"][contributor.id] = { displayName: displayName };

    // check if previous contributions have already with these goods
    let afterContribution = client.memory["contributors"][contributor.id][goods] ? client.memory["contributors"][contributor.id][goods] + change : change;
  
    client.memory["contributors"][contributor.id][goods] = afterContribution;

    // sync to memory.json
    fs.writeFile("./memory.json", JSON.stringify(client.memory, null, 4), err => {
        if (err) throw err;
    });
    return afterTransfer;
}

// add send a shout a number of times
function ora(channel, timesNotParsed) {
    let times = parseInt(timesNotParsed);
    if (isNaN(times) || times == 0) {
        channel.send('だが断る');
    }
    else if (times > 665 || times < -665) {
        channel.send("Artificial JoJo: Discord, what does the scouter say about the character count?");
        channel.send("Discord: It's over 2000!!!");
    }
    else if (times == 4) {
        channel.send(boldRepetitive("オラ ", 5));
    }
    else if (times > 0) {
        channel.send(boldRepetitive("オラ ", times));
    }
    else if (times < 0) {
        channel.send(boldRepetitive("無駄 ", -times));
    }
}

// repeats the string in repeated a number of times in bold format
function boldRepetitive(text, times) {
    return "**" + text.repeat(times) + "**";
}

client.login(token);