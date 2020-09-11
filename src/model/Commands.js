import CountdownNextEpisode from "../commands/CountdownNextEpisode";
import DiceRoll from "../commands/DiceRoll.js";
import Garfield from "../commands/Garfield";
import GetStand from "../commands/GetStand";
import Help from "../commands/Help";
import Introduction from "../commands/Introduction";
import LoavesEaten from "../commands/LoavesEaten";
import ShoutOra from "../commands/ShoutOra";
import ShowProgress from "../commands/ShowProgress";
import TasteOfA from "../commands/TasteOfA";

// goal of this class is to make the commands array somewhat of a singleton
// (as far that is possible in javascript)
class Commands {
	constructor(donationRepository){
	    this.commands = [
			new Introduction(),
			new ShowProgress(donationRepository),
			new TasteOfA(),
			new DiceRoll(),
            new GetStand(),
			new ShoutOra(),
			new LoavesEaten(),
			new CountdownNextEpisode(),
			new Garfield(),
			new Help(this)
		];
	}

	getArray(){
		return this.commands;
	}
}

export default Commands;