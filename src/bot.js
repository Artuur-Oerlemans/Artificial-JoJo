const token = require("./token.json").token;
﻿import * as Discord from "discord.js";
import Service from "./service/Service.js";
import DonationRepository from "./repository/donationRepository"
import Donations from "./service/Donations"
import Commands from "./model/Commands"

var donationRepository = new DonationRepository();
var donations = new Donations(donationRepository);
var commands = new Commands(donationRepository);
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
var service = new Service(commands, donations);

client.login(token)
    .then((e) => { //Handle promises, unhandled promises will be deprecated soon.
        console.log("Discord logged in!");
    }).catch(error => {
        console.log("Discord failed to login!");
        console.log(error);
    });

client.on("ready", () => {
    console.log("ready");
    client.user.setActivity("Nomad: Artificial JoJo 2", { type: "WATCHING" });
});

//the thing that should be infront of commands
const commandPrefix = ";"

client.on('error', console.error);

// message receiver
client.on("messageCreate", (message) => {
	
	if (isFromBot(message)) return;

	if (wasCommandPrefixUsed(message)) {

		removePrefixFromMessage(message);
        service.executeCommands(message);
        return;
    }

	if (message.mentions.has(client.user)) {
		service.personalInteraction(message);
    }
});

function isFromBot(message) {
	return message.author.bot;
}

function removePrefixFromMessage(message) {
	message.content = message.content.substring(commandPrefix.length);
}

function wasCommandPrefixUsed(message) {
	return message.content[0] == commandPrefix;
}