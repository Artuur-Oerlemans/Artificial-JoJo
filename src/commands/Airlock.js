import AbstractCommand from "./AbstractCommand";
var fs = require('fs')
	, gm = require('gm')
	, request = require('request');

var displayName;
var channel;

class Airlock extends AbstractCommand {
	commandWord() { return "airlock"; }

    activateCommand(message) {
        if (message.mentions.members.array().length == 0) {
            this.postNobodyEjected(message.channel);
        } else if (message.mentions.users.first().id == 518344287554109450) {
            this.postRejection(message.channel, message.author);
        } else {
            let subject = message.mentions.members.first();
            this.postEjection(message.channel, subject);
        }
    }

    postNobodyEjected(channel) {
        let printer = new Print(channel);
        let writer = new WriteText(printer,
            "No one was ejected. (Skipped)",
            0,
            0,
            45);
        writer.apply('./memeTemplates/ejectBackground');
    }

    postEjection(channel, subject) {
        let printer = new Print(channel);
        let writer = new WriteText(printer,
            this.randomText(subject),
            0,
            0,
            45);
		// the center of the canvas is x=640 y=360
        let composite = new CompositePredecidedBack(writer,
            './memeTemplates/ejectBackground',
            this.randomPoint(595, 1100),
            this.randomPoint(320,180));

        let extractFace = new ExtractFace(composite, 90, this.randomAngle());
        extractFace.start(subject);
    }

    postRejection(channel, author) {
        let printer = new Print(channel);
        let writer = new WriteText(printer,
            "I am sorry " + author.username +", I am afraid I can not do that.\n" +
			"I think you know what the problem is just as well as I do.\n" + 
			"This mission is too important for me to allow you to jeopardize it.",
            0,
            0,
            40);
        writer.apply('./memeTemplates/ejectBackground');
    }

    randomPoint(middle, spread) {
        let pointNotRounded = middle - 0.5 * spread + Math.random() * spread;
        return Math.floor(pointNotRounded);
    }

    randomText(subject) {
        if (Math.random() < 0.27) {
            return subject.displayName + " was An imposter.";
        } else
            return subject.displayName + " was not An imposter.";
    }

    randomAngle() {
        return Math.floor(Math.random() * 360);
    }

    usageDescription() {
        return this.commandWord() + " {@user}";
	}

	commandDescription() {
		return "It is among us.";
	}
}

class ExtractFace {
    constructor(followObj, faceSize, rotation) {
        this.followObj = followObj;
        this.faceSize = faceSize;
        this.rotation = rotation;
    }

    start(subject) {
        let afterAdress = './memeTemplates/profileImage';
        let followObj = this.followObj;
        let faceURL = subject.user.displayAvatarURL;

        gm(request(faceURL))
            .noProfile()
            .rotate('transparent', this.rotation)
            .resize(this.faceSize, this.faceSize)
            .write(afterAdress + '.png', function(err) {
                if (err) console.log(err);
                else followObj.apply(afterAdress);
            });
    }
}

class CompositePredecidedBack {
    constructor(followObj, backAdress, x, y) {
        this.followObj = followObj;
        this.backAdress = backAdress;
        this.coords = '+' + x + '+' + y;
    }

    apply(adress) {
        let afterAdress = adress + 'cpb';
        let followObj = this.followObj;

        gm(this.backAdress + '.png')
            .composite(adress + '.png')
            .in('-compose', 'Over')
            .in('-geometry', this.coords)
            .write(afterAdress + '.png', function(err) {
                if (err) {
                    throw err;
                } else {
                    followObj.apply(afterAdress);
                }
            });
    }
}

class WriteText {
	constructor(followObj, text, x, y, fontSize) {
        this.followObj = followObj;
		this.text = text;
		this.x = x;
		this.y = y;
		this.fontSize = fontSize;
	}

	apply(adress) {
        let afterAdress = adress + 'pr';
        let followObj = this.followObj;

        gm(adress + '.png')
            .fill('#FFFFFF')
            .stroke('black')
			.strokeWidth(1)
			.drawText(this.x, this.y, this.text, 'center')
            .font('./fonts/ArialUnicodeMS.ttf')
			.fontSize(this.fontSize + 'px')
			.write(afterAdress + '.png', function (err) {
				if (err) {
					throw err;
				} else {
                    followObj.apply(afterAdress);
				}
			});
	}
}

class Print {
	constructor(channel) {
		this.channel = channel;
	}

	apply(adress) {
		this.channel.send({ files: [adress + '.png'] });
	}
}

export default Airlock;