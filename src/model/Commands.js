import LoavesEaten from "../commands/LoavesEaten";
import Introduction from "../commands/Introduction";
import Help from "../commands/Help";
import CountdownNextEpisode from "../commands/CountdownNextEpisode";
import ShowProgress from "../commands/ShowProgress";
import Garfield from "../commands/Garfield";
import ShoutOra from "../commands/ShoutOra";
import GetStand from "../commands/GetStand";
import TasteOfA from "../commands/TasteOfA";

// goal of this class is to make the commands array somewhat of a singleton
// (as far that is possible in javascript)
class Commands {
	constructor(donationRepository){
	    this.commands = [
			new Introduction(),
			new ShowProgress(donationRepository),
            new TasteOfA(),
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