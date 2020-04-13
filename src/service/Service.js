﻿import * as discord from "discord.js";
import Currency from "../Currency";
import Stand from "../stand";
import shoutOra from "../shoutOra";
import improveName from "../improveName";
import garfield from "../garfield";
import makeMeme from "../memeMaker";
import makeChristmas from "../christmasMaker";
import * as fs from "fs";
import LoavesEaten from "../commands/LoavesEaten";
import Introduction from "../commands/Introduction";
import Help from "../commands/Help";
import CountdownNextEpisode from "../commands/CountdownNextEpisode";
import ShowProgress from "../commands/ShowProgress";
import Donations from "./Donations"

//the thing that should be infront of commands
const prefix = ";";

var donations = new Donations();

class Service{

	constructor(){
		this.commands = [];
	}

	executeCommands(message) {
		var args = message.content.substring(prefix.length).split(' ');
		var command = args[0];

		// now the first args will be the thing following the command
		args = args.splice(1);
    
		switch (command) {
			case 'introduce':
				Introduction.activateCommand(message);
				break;
			case 'loaves_eaten':
				LoavesEaten.activateCommand(message);
				break;
			case 'my_stand':
				let stand = new Stand(message.author.id);
				stand.tellStand(message.channel);
				break;
			case 'ora':
				shoutOra(message.channel, args[0]);
				break;
			case "help":
				Help.activateCommand(message);
				break;
			case "progress":
				ShowProgress.activateCommand(message, donations);
				break;
			case "improve_name":
				improveName(message);
				break;
			case "garfield":
				garfield(message);
				break;
			case "countdown":
				CountdownNextEpisode.activateCommand(message);
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