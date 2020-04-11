
// javascript doesn't support abstact classes
// but it's still good practice to act like it does
class AbstractCommand {

    private const commandWord = "AbstractCommand"

    public shouldCommandBeActivated(messageContent) {
        var args = messageContent.split(' ');
        var firstWord = args[0];

        // now the first args will be the thing following the command
        return firstWord == this.commandWord;
    }

    public activateCommand(message) {
        throw "Command action not implemented for inherriting class";

    }

    public usageDescription() {
        throw "usage description not implemented for inherriting class";

        return ";somethingSomething";
    }

    public commandDescription() {
        throw "Command description not implemented for inherriting class";

        return "you can use this to do something"
    }

}

export default AbstractCommand;