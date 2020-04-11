import AbstractCommand from "./AbstractCommand.js"

class LoavesEaten extends AbstractCommand {
    static commandWord() { return "loaves_eaten"; }
    height = "f";
    width;
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}

export default LoavesEaten;