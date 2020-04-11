
// javascript doesn't support abstact classes
// but it's still good practice to act like it does
class AbstractCommand {

    static shouldCommandBeActivated(messageContent) {
        var args = messageContent.split(' ');
        var firstWord = args[0];

        // now the first args will be the thing following the command
        return firstWord == this.commandWord();
    }

    // javascript won't allow normal class variables
    static commandWord() { return "abstract_command";}

    static activateCommand(message) {
        throw "Command action not implemented for inherriting class";

    }

    static usageDescription() {
        throw "usage description not implemented for inherriting class";

        return ";somethingSomething";
    }

    static commandDescription() {
        throw "Command description not implemented for inherriting class";

		return "you can use this to do something";
    }

}

export default AbstractCommand;