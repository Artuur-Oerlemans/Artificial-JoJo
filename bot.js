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

    if (message.author.bot) return;

    var args = message.content.substring(prefix.length).split(' ');
    var cmd = args[0];

    // adds this emoji to our memory
    const menacing = client.emojis.find(emoji => emoji.name === "menacing");

    // now the first args will be the thing following the command
    args = args.splice(1);

    switch (cmd) {

        case 'introduce':

            message.channel.send("I, Artificial JoJo, have a golden dream \nI want to become a gang-star \nHence have to attain the rank of capo \nWill YOU help me gather 10,000,000,000 lires?");
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

        // experimental code.
        case 'doekoe':
            // creates a doekoe variable in budget
            client.memory["budget"] = {
                amount: 0
            };
            fs.writeFile("./memory.json", JSON.stringify(client.memory, null, 4), err => {
                if (err) throw err;
                console.log("transferred");
            });
            break;
        case 'donate':
            receiveDonation(message.channel, message.author, 8);
            break;
    }

    // lacks check if there is a mention
    //if (message.mentions.users.first().id == 518344287554109450) {
    //    message.channel.send("I, Artificial JoJo, have a dream.");
    //}

});

// Donate lires
function receiveDonation(channel, user, amount) {
    channel.send(thankYouMessage(user));
    let inBankAmount = client.memory["budget"].amount;
    channel.send("I used to have " + inBankAmount);

    let totalAmount = updateAmount("budget", 9)
    channel.send("Now I have " + totalAmount);
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
        , "GOURUDO EKUSUPERIENSU"];
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