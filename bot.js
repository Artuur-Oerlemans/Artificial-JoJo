const discord = require('discord.js');
const fs = require("fs");
const token = "NTE4MzQ0Mjg3NTU0MTA5NDUw.DuQYpw.Ibtms2TwuW1agDtb2-tQ-HL9Jl4";

var client = new discord.Client();
client.memory = require("./memory.json");



client.login(token);

client.on("ready", () => {
    console.log("ready");

    client.user.setActivity("Oh, That's A Baseball!", { type: "PLAYING" });
});

//the thing that should be infront of commands
const prefix = ";"

// what to do when a message is received
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
            showIntroduction(message.channel);
            break;
        case 'loaves_eaten':
            tellLoavesEaten(message.channel, args[0]);
            break;
        case 'ora':
            shoutOra(message.channel, args[0]);
            break;
        // shows the possible commands
        case "help":
            showHelp(message.channel);
            break;
        case "progress":
            showProgress(message.channel);
            break;
    }
    executeDonations(message);
}

function tellLoavesEaten(channel, yearsUnfiltered) {
    // adds this emoji to our memory 
    let menacing = client.emojis.find(emoji => emoji.name === "menacing");

    let years = parseInt(yearsUnfiltered);
    if (isNaN(years) || years < 0) {
        channel.send('グッ');
    } else {
        channel.send(menacing.toString() + ' You have eaten about ' + Math.floor(60.3 * years) + ' loaves in your life.' + menacing.toString());
    }
}

function showIntroduction(channel) {
    channel.send("I, Artificial JoJo, have a golden dream");
    channel.send("I want to become a gang-star");
    channel.send("Hence have to attain the rank of capo");
    channel.send("Will YOU help me gather 10,000,000,000 lire?");
}

function showHelp(channel) {
    embed = new discord.RichEmbed();
    embed.setColor("FF5733");
    embed.setThumbnail("https://vignette.wikia.nocookie.net/jjba/images/a/ab/Joseph-oh-my-god.jpg/revision/latest?cb=20140807173126");

    embed.addField(";progress", "Show how far I'm at becoming a gang-star");
    embed.addField(";introduce", "I, Artificial JoJo, will give a short introduction to my golden dream.");
    embed.addField(";loaves_eaten", "Give how old you are and it calculates how many loaves you have eaten.");
    embed.addField(";ora", "Give the amount of times you want ora");
    embed.addField("contribute!", "In order to fullfil my dream of become a gang-star I need doekoe.\nMention me with any form of money to help me.")

    channel.send(embed);
}

function showProgress(channel) {
    let progress = client.memory["inventory"].lires;
    let leaderBoard = getLeaderBoard("lires")
    let embed = new discord.RichEmbed();

    embed.setColor("FF5733");
    embed.setThumbnail("https://media.comicbook.com/2018/10/jojo-part-5-op-1138720-640x320.jpeg");

    embed.addField("Progress", "We have " + progress.toLocaleString() + " lire out of 10,000,000,000 lire.\nOnly " + (10000000000 - progress).toLocaleString() + " lire until I can get the rank of capo.");

    embed.addField("Passione top 3", "**1.** " + leaderBoard[0].displayName + " " + leaderBoard[0].goods.toLocaleString()
        + " lire\n2. " + leaderBoard[1].displayName + " " + leaderBoard[1].goods.toLocaleString() + " lire\n2. " + leaderBoard[2].displayName + " " + leaderBoard[2].goods.toLocaleString()) + " lire";

    channel.send(embed);
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
    new Currency(["🦋"], "*Nanako's wallet just became a bit lighter*\nYou can't let your guard down in this server.", 10000),
    new Currency(["🤑"], "*three bubbles approach*", 5106),
    new Currency(["💷"], "The value of 1 pound is 3097 lire", 3097),
    new Currency(["💶"], "The value of 1 euro is 1936 lire", 1936),
    new Currency(["💵", "💲"], "The value of 1 dollar is 1702 lire", 1702),
    new Currency(["💴"], "The value of 1 yen is 16 lire", 16),
    new Currency(["doekoe"], "The value of 1 doekoe is 1 lire", 1),
    new Currency(["💸"], "*Th-The money is flying?!*\nゴ ゴ ゴ ゴ ゴ \nＴＨＩＳ 　ＭＵＳＴ 　ＢＥ 　ＴＨＥ 　ＷＯＲＫ 　ＯＦ 　ＡＮ 　ＥＮＥＭＹ 「ＳＴＡＮＤ」！！\nゴ ゴ ゴ ゴ ゴ ", 0),
    new Currency(["💎"], "*Cr-crazy diamondo?!*\nゴ ゴ ゴ ゴ ゴ \nＴＨＩＳ 　ＭＵＳＴ 　ＢＥ 　ＡＮ 　ＥＮＥＭＹ 「ＳＴＡＮＤ」！！\nゴ ゴ ゴ ゴ ゴ ", 0),
    new Currency(["💩", "😈", "👿", "👹", "👺", "💀", "👻", "👽", "🤖", "🤡", "🕴"], "ゴ ゴ ゴ ゴ ゴ \nＴＨＩＳ 　ＭＵＳＴ 　ＢＥ 　ＡＮ 　ＥＮＥＭＹ 「ＳＴＡＮＤ」！！\nゴ ゴ ゴ ゴ ゴ ", 0),
    new Currency(["💳"], "Sorry, we don't accept credit cards", 0),
    new Currency(["💰"], "Ah, a jute bag with a dollar sign. \nThanks?", 0),
    new Currency(["🛢"], ":boom:", 0),
    new Currency(["🎁"], "ゴ ゴ ゴ ゴ ゴ \nＴＨＩＳ 　ＭＵＳＴ 　ＢＥ 　ＴＨＥ 　ＷＯＲＫ 　ＯＦ 　ＡＮ 　ＥＮＥＭＹ 「ＳＴＡＮＤ」！！\nゴ ゴ ゴ ゴ ゴ ", 0),
    new Currency(["💣"], "*Ohhhh NOoohhhh*", 0),
    new Currency(["🥖"], "grazie", 0),
    new Currency(["🍌"], "*Chooses to stay at a safe distance.*", 0),
    new Currency(["🚑"], "逃げるんだよ！！！", 0),
    new Currency(["🐶", "🐕"], "This isn't a very good place for dogs", 0),
    new Currency(["🐦", "🔥"], "**マジシャンズレッド！！**", 0),
    new Currency(["⚰"], "ディオがいない！？！", 0),
    new Currency(["🔪", "🗡"], "HINJAKU HINJAKU!!!", 0),
    new Currency(["🍒"], "*lero lero lero lero*", 0),
    new Currency(["🚙", "🏎", "🚗"], "Kars?!\nNigerundayo!!!!", 0),
    new Currency(["⭐", "🌠", "✴", "🌟"], "**オラ　オラ　オラ　オラ！！！**", 0),
    new Currency(["🗺", "🌐", "🕰", "🕐", "🕙", "🕥", "🕚", "🕦", "🕛", "🕧", "🕜", "🕑", "🕝", "🕒", "🕞", "🕓", "🕟"
        , "🕔", "🕠", "🕕", "🕡", "🕖", "🕢", "🕗", "🕣", "🕘", "🕤", "⏰", "⏲", "⌚", "⏱"], "**TOKI WO TOMARE!!!**", 0),
    new Currency(["🛅", "💼"], "*only contains a passport for an adult child*", 0),
    new Currency(["🍨", "🍦"], "*Whe-where did avdol go?*", 0),
    new Currency(["✈", "🛬", "🛫", "🛩"], "I will be the pilot\n:boom:", 0),
    new Currency(["🖋", "🔏", "✍"], "**ヘブンズ・ドアー**\nI see, you met a stand made out of stone.", 0),
    new Currency(["🤐"], "ゴ ゴ ゴ ゴ ゴ \nＴＨＩＳ 　ＭＵＳＴ 　ＢＥ 　ＴＨＥ 　ＷＯＲＫ 　ＯＦ 　Ａ~~Ｎ 　ＥＮＥＭＹ~~   friendly 「ＳＴＡＮＤ」！！\nゴ ゴ ゴ ゴ ゴ ", 0),
    new Currency(["🔒", "🔐"], "ザ・ロック", 0),
    new Currency(["🍞"], "グッ", 0),
    new Currency(["🇮🇹"], "Per l'onore d'Italia", 0),
    new Currency(["🇩🇪"], "馬鹿者が！！\nドイツの科学は世界一！！！", 0),
    new Currency(["😱"], "OH MY GODD!!!!!", 0),
    new Currency(["💪"], "*poses*", 0),
    new Currency(["👅"], "This taste...\nIs the taste of a liar!\nArtificial JoJo\n*sweats*", 0),
    new Currency(["🧀"], "シーザーー！！！", 0),
    new Currency(["🇺🇸"], "*Di-did something just move?*", 0),
    new Currency(["💅"], "How do I say this, I got a...", 0),
    new Currency(["👌", "🖐", "🤚", "✋", "🖖", "🖕", "🤞", "🤙"], "**ザ・ハンド**", -1),
    new Currency(["🔫"], "*Buys some salami to feed the bullets*\nThey all work so hard", -100)
]

// Donate lires
function receiveDonation(contributor, channel, change) {
    let inBank = client.memory["inventory"].lires;
    let afterTransfer = inBank;
    if (change != 0) {
        afterTransfer = updateInventory(contributor, "lires", change);
    }

    channel.send(inBank + " lire => " + afterTransfer + " lire");
    tellRanking(channel, "lires", contributor);
}

function tellRanking(channel, goods, contributor) {
    ranking = getRanking(contributor.id, goods);
    channel.send("ranking: " + ranking.rank);
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

// shout a battle cry a number of times
function shoutOra(channel, timesNotParsed) {
    let times = parseInt(timesNotParsed);
    if (timesNotParsed == "e" || timesNotParsed == "pi") {
        channel.send("なにィ！！");
        channel.send("そんなバカな！！");
    } else if (isNaN(times) || times == 0) {
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

// gets the ranking of a person for a certain goods
function getRanking(id, goods) {
    leaderBoard = getLeaderBoard(goods)
    for (let rank = 1; rank <= leaderBoard.length; rank++) {
        if (leaderBoard[rank - 1].id == id)
            return { rank: rank, goods: leaderBoard[rank - 1].goods };
    }
    return { rank: leaderBoard.length, goods: 0 };
}

// return leaderboard with format: id, displayName and [goods]
function getLeaderBoard(goods) {
    let contributors = client.memory["contributors"];

    let leaderBoard = Object.keys(contributors).map(function (key) {
        return { id: key, displayName: this[key].displayName, goods: this[key][goods] ? this[key][goods] : 0 };
    }, contributors);
    leaderBoard.sort(function (p1, p2) { return p2.goods - p1.goods; });

    return leaderBoard;
}
