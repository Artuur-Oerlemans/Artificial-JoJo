const discord = require('discord.js');
const fs = require("fs");
const token = "NTE4MzQ0Mjg3NTU0MTA5NDUw.DuQYpw.Ibtms2TwuW1agDtb2-tQ-HL9Jl4";

var client = new discord.Client();
client.memory = require("./memory.json");
const Currency = require("./currency.js");


client.login(token);

client.on("ready", () => {
    console.log("ready");

    client.user.setActivity("Oh, That's A Baseball!", { type: "PLAYING" });
});

//the thing that should be infront of commands
const prefix = ";"

client.on('error', console.error);

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
        case "help":
            showHelp(message.channel);
            break;
        case "progress":
            showProgress(message.channel);
            break;
        case "countdown":
            showCountdownNextEpisode(message.channel);
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
    embed.addField(";countdown", "Tells how long until the next episode.");
    embed.addField("contribute!", "In order to fullfil my dream of become a gang-star I need doekoe.\nMention me with any form of money to help me.")

    channel.send(embed);
}


function showCountdownNextEpisode(channel) {
    now = new Date();
    nextEpisodeDate = getNextDate(5, 20);
    channel.send(differenceDatesDHHMMSS(now, nextEpisodeDate)
        + " until the next episode of JoJo's bizarre adventure part 5: Golden Wind.");
}

// gets the next time that it is that day and hour. 
// Sunday = 0
function getNextDate(day, hour) {
    var now = new Date();
    var nextTime = new Date();
    //go to correct day of the week
    nextTime.setDate(nextTime.getDate() + (day + 7 - nextTime.getDay()) % 7);
    //if that is after the hour, go to next week.
    if (now.getDay() == day && now.getHours() > hour - 1) {
        nextTime.setDate(nextTime.getDate() + 7);
    }
    // set to the correct hour
    nextTime.setHours(20);
    nextTime.setMinutes(0);
    nextTime.setSeconds(0);

    return nextTime;
}

function differenceDatesDHHMMSS(date1, date2) {
    let output = "";
    let differenceMilliseconds = date2.getTime() - date1.getTime();

    let oneSecond = 1000;
    let oneMinute = 60 * oneSecond;
    let oneHour = 60 * oneMinute;
    let oneDay = 24 * oneHour;

    let seconds = Math.floor((differenceMilliseconds / oneSecond) % 1000);
    let minutes = Math.floor((differenceMilliseconds / oneMinute) % 60);
    let hours = Math.floor((differenceMilliseconds / oneHour) % 24);
    let days = Math.floor(differenceMilliseconds / oneDay);

    if (days == 1) {
        output += days + " day and "
    } else if (days > 1) {
        output += days + " days and "
    }
    output += twoDigits(hours) + ":" + twoDigits(minutes) + ":" + twoDigits(seconds);
    return output;
}

function twoDigits(number) {
    return ('0' + number).slice(-2);
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
