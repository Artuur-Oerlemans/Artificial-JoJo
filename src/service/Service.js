﻿﻿import Stand from "../stand";
import shoutOra from "../shoutOra";
import improveName from "../improveName";
import makeMeme from "../memeMaker";
import makeChristmas from "../christmasMaker";
import Donations from "./Donations"

var donations = new Donations();

class Service{

	constructor(commands, donations){
		//TODO: apply IoD here.
		this.donations = donations;

		this.commands = commands;
	}

	executeCommands(message) {
		let commandsArray = this.commands.getArray();

		commandsArray
			.filter(cmd => cmd.shouldCommandBeActivated(message.content))
			.forEach(cmd => cmd.activateCommand(message));


		var args = message.content.split(' ');
		var command = args[0];

		// now the first args will be the thing following the command
		args = args.splice(1);
    
		switch (command) {
			case 'my_stand':
				let stand = new Stand(message.author.id);
				stand.tellStand(message.channel);
				break;
			case "improve_name":
				improveName(message);
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