
// javascript doesn't support abstact classes
// but it's still good practice to act like it does
class AbstractCommand {

    public shouldCommandBeActivated(text) {
        return False;
    }

    public activateCommand(message) {

    }

    public usageDescription() {
        return ";somethingSomething";
    }

    public commandDescription() {
        return "you can use this to do something"
    }

}

export default AbstractCommand;