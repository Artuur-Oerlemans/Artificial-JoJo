const token = require("./token.json").token;
﻿import * as discord from "discord.js";
import Service from "./service/Service.js";

var client = new discord.Client();
var service = new Service();
client.memory = require("./memory.json");

client.login(token)
    .then((e) => { //Handle promises, unhandled promises will be deprecated soon.
        console.log("Discord logged in!");
    }).catch(error => {
        console.log("Discord failed to login!");
        console.log(error);
    });

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
        service.executeCommands(message);
        return;
    }

    // respond to personal things
    if (message.mentions.users.array().length == 1 && message.mentions.users.first().id == 518344287554109450) {
        service.executeDonations(message);
    }

});