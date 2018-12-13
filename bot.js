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
// adds this emoji to our memory 
const menacing = client.emojis.find(emoji => emoji.name === "menacing"); //TODO try make a more general version of this

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
        case 'loaves_eaten':
            // approximates the number of loaves you would have eaten in your life
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

        //// experimental code.
        //case 'doekoe':
        //    // creates a doekoe variable in budget
        //    client.memory["budget"] = {
        //        amount: 0
        //    };
        //    fs.writeFile("./memory.json", JSON.stringify(client.memory, null, 4), err => {
        //        if (err) throw err;
        //        console.log("transferred");
        //    });
        //    break;
        //case 'donate':
        //    receiveDonation(message.channel, 8);
        //    break;
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
    receiveDonation(message.channel, currency.valueInLires);

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
    new Currency([":moneybag:", "💰"], "Ah, a jute bag with a dollar sign. \nThanks?", 0)
]

// Donate lires
function receiveDonation(channel, change) {
    let inBankAmount = client.memory["budget"].amount;
    let newAmount = updateAmount("budget", change);

    channel.send(inBankAmount + " lire => " + newAmount + " lire");
}

function thankYouMessage(user) {
    let nickname;
    if (user.nickname == null) {
        nickname = user.nickname;
    } else {
        nickname = user.username;
    }

    let responses = ["GURETO DESU-YO!"
        , "Naissu"
        , "Grazie"
        , "Berry naissu " + nickname + "-chan"
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


// Increase the amount of something in the JSON file.
function updateAmount(collection, change) {
    let inBankAmount = client.memory[collection].amount;
    let totalAmount = inBankAmount + change;

    client.memory[collection] = {
        amount: totalAmount
    };
    fs.writeFile("./memory.json", JSON.stringify(client.memory, null, 4), err => {
        if (err) throw err;
    });
    return totalAmount;
}

// add send a shout a number of times
function ora(channel, amount) {
    let times = parseInt(amount);
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
        channel.send(boldRepetitive("無駄 ", times));
    }

}

// repeats the string in repeated a number of times in bold format
function boldRepetitive(text, times) {
    return "**" + text.repeat(times) + "**";
}

client.login(token);