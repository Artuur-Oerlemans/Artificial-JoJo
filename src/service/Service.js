class Service{

	constructor(commands, donations){
		this.donations = donations;

		this.commands = commands;
	}

	executeCommands(message) {
		let commandsArray = this.commands.getArray();

		commandsArray
			.filter(cmd => cmd.shouldCommandBeActivated(message.content))
			.forEach(cmd => cmd.activateCommand(message));
		
		this.donations.executeDonations(message);
	}

	personalInteraction(message){
		this.donations.executeDonations(message);
	}
}

export default Service;