
// javascript doesn't support abstact classes
// but it's still good practice to act like it does
class AbstractCommand {

    shouldCommandBeActivated(messageContent) {
        var args = messageContent.split(' ');
        var firstWord = args[0];

        // now the first args will be the thing following the command
        return firstWord == this.commandWord();
    }

    // javascript won't allow normal class variables
    commandWord() { return "abstract_command";}

    activateCommand(message) {
        throw "Command action not implemented for inherriting class";

    }

    usageDescription() {
        throw "usage description not implemented for inherriting class";

        return this.commandWord() + " {fill in}";
    }

    commandDescription() {
        throw "Command description not implemented for inherriting class";

		return "you can use this to do something";
    }

}

export default AbstractCommand;