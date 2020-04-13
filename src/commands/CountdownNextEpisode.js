import AbstractCommand from "./AbstractCommand";

class CountdownNextEpisode extends AbstractCommand {

	static commandWord() { return "countdown"; }

	static usageDescription() {
		return commandWord();
	}

	static commandDescription() {
		return "Tells how long until the next episode.";
	}

	static activateCommand(message) {
		let channel = message.channel;
		
		let now = new Date();
		let nextEpisodeDate = this.getNextDate(5, 19);
		channel.send("NEVER\nGo read the manga!");
		//channel.send(this.differenceDatesDHHMMSS(now, nextEpisodeDate)
		//    + " until the next episode of JoJo's bizarre adventure part 5: Golden Wind.");
		
	}

	
	// gets the next time that it is that day and hour. 
	// Sunday = 0
	static getNextDate(day, hour) {
		let now = new Date();
		let nextTime = new Date();
		//go to correct day of the week
		nextTime.setDate(nextTime.getDate() + (day + 7 - nextTime.getDay()) % 7);
		//if that is after the hour, go to next week.
		if (now.getDay() == day && now.getHours() > hour - 1) {
			nextTime.setDate(nextTime.getDate() + 7);
		}
		// set to the correct hour
		nextTime.setHours(hour);
		nextTime.setMinutes(0);
		nextTime.setSeconds(0);

		return nextTime;
	}

	static differenceDatesDHHMMSS(date1, date2) {
		let output = "";
		let differenceMilliseconds = date2.getTime() - date1.getTime();

		let oneSecond = 1000;
		let oneMinute = 60 * oneSecond;
		let oneHour = 60 * oneMinute;
		let oneDay = 24 * oneHour;

		let seconds = Math.floor((differenceMilliseconds / oneSecond) % 1000);
		let minutes = Math.floor((differenceMilliseconds / oneMinute) % 60);
		let hours = Math.floor((differenceMilliseconds / oneHour) % 24);
		let days = Math.floor(differenceMilliseconds / oneDay);

		if (days == 1) {
			output += days + " day and "
		} else if (days > 1) {
			output += days + " days and "
		}
		output += this.twoDigits(hours) + ":" + this.twoDigits(minutes) + ":" + this.twoDigits(seconds);
		return output;
	}

	static twoDigits(number) {
		return ('0' + number).slice(-2);
	}
}

export default CountdownNextEpisode;