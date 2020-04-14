import LoavesEaten from "../commands/LoavesEaten";
import Introduction from "../commands/Introduction";
import Help from "../commands/Help";
import CountdownNextEpisode from "../commands/CountdownNextEpisode";
import ShowProgress from "../commands/ShowProgress";
import Garfield from "../commands/Garfield";

// goal of this class is to make the commands array somewhat of a singleton
// (as far that is possible in javascript)
class Commands {
	constructor(donations){
		this.commands = [
			new ShowProgress(donations),
			new Introduction(),
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