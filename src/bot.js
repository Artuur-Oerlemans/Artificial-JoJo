const token = require("./token.json").token;
﻿import * as discord from "discord.js";
import Service from "./service/Service.js";

var client = new discord.Client();
var service = new Service();

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

// message receiver
client.on("message", (message) => {
	
	if (isFromBot(message)) return;

    // check if a command was used
	if (wasCommandUsed(message)) {
        service.executeCommands(message);
        return;
    }

	if (wasMentioned(message)) {
		service.personalInteraction(message);
    }

});

function isFromBot(message) {
	return message.author.bot;
}

function wasCommandUsed(message) {
	return message.content[0] == prefix;
}

function wasMentioned(message) {
	return message.mentions.users.array().length == 1 && message.mentions.users.first().id == 518344287554109450;
}