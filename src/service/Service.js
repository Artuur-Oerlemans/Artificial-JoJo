﻿import * as discord from "discord.js";
import Currency from "../Currency";
import Stand from "../stand";
import shoutOra from "../shoutOra";
import improveName from "../improveName";
import garfield from "../garfield";
import makeMeme from "../memeMaker";
import makeChristmas from "../christmasMaker";
import * as fs from "fs";
import LoavesEatenCommand from "../commands/LoavesEatenCommand";
import IntroductionCommand from "../commands/IntroductionCommand";
import HelpCommand from "../commands/HelpCommand";
import CountdownNextEpisodeCommand from "../commands/CountdownNextEpisodeCommand";
import ShowProgressCommand from "../commands/ShowProgressCommand";
import Donations from "./Donations"

//the thing that should be infront of commands
const prefix = ";";

let memory = require("../memory.json");
var donations = new Donations();

class Service{

	executeCommands(message) {
		var args = message.content.substring(prefix.length).split(' ');
		var command = args[0];

		// now the first args will be the thing following the command
		args = args.splice(1);
    
		switch (command) {
			case 'introduce':
				IntroductionCommand.activateCommand(message);
				break;
			case 'loaves_eaten':
				LoavesEatenCommand.activateCommand(message);
				break;
			case 'my_stand':
				let stand = new Stand(message.author.id);
				stand.tellStand(message.channel);
				break;
			case 'ora':
				shoutOra(message.channel, args[0]);
				break;
			case "help":
				HelpCommand.activateCommand(message);
				break;
			case "progress":
				ShowProgressCommand.activateCommand(message, donations);
				break;
			case "improve_name":
				improveName(message);
				break;
			case "garfield":
				garfield(message);
				break;
			case "countdown":
				CountdownNextEpisodeCommand.activateCommand(message);
				break;
			case "taste_of_a":
				makeMeme(message);
				break;
			case "taste_of_christmas":
				makeChristmas(message);
				break;
		}
		
		donations.executeDonations(message);
	}

	personalInteraction(message){
		donations.executeDonations(message);
	}
}

export default Service;