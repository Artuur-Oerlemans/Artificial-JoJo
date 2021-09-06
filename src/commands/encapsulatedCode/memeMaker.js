var fs = require('fs')
  , gm = require('gm')
  , got = require('got');
var displayName;
var statement;
var channel;

function makeMeme(message) {
	let subject;
	let arg = message.content.split(" ").slice(1);
	if(message.mentions.members.size != 0){
		subject = message.mentions.members.first();
		arg = arg.slice(1);
	} else {
		subject = message.member;
	}
	statement = arg.join(" ");
	let faceURL = subject.user.displayAvatarURL();
    displayName = reduceWidthByUsingMultipleLines(subject.displayName);
    channel = message.channel;
    console.log(faceURL);
	extractFaceAndMakeGrey(faceURL)
}

function reduceWidthByUsingMultipleLines(sentence){
	let words = sentence.split(' ');
	for(let i = 0; i < words.length; i++){
		if(words[i].length> 9){
			let middle = Math.floor(words[i].length /2);
			words[i] = words[i].slice(0, middle) + "-\n" + words[i].slice(middle);
		}
	}
	return words.join("\n") + "!";
}

function extractFaceAndMakeGrey(faceURL){
	//gm("./standImages/38.png")
	let faceSize = 540;
	gm(got.stream(faceURL))
		.noProfile()
		.colorspace("GRAY")
		//.monochrome()
		.resize(faceSize, faceSize)
		.write('./temp/greyFace.png', function (err) {
			if (err) console.log(err);
			else composeBackAndFace();
		});
}

function composeBackAndFace(){
	gm('./memeTemplates/tasteOfALiarBACK.png')
    .composite('./temp/greyFace.png')
    .in('-compose', 'Over')
    .in('-geometry', '+70+10')
    .write('./temp/backAndFront.png', function (err) {
    	if (err) console.error(err);
    	else composeImageAndFront();
    });
}

function composeImageAndFront(){
	gm('./temp/backAndFront.png')
    .composite('./memeTemplates/tasteOfALiarFRONT.png')
    .in('-compose', 'Over')
    .in('-geometry', '+0+0')
    .write('./temp/resultGM2.png', function (err) {
    	if (err) console.error(err);
    	else{ addPersonDescription();}
    });
}

function addPersonDescription(){
	let fontSize = 30;
	if(statement.length > 6)
		fontSize = Math.floor(fontSize * 6 / statement.length);
	if(statement == "")
		statement = "liar!";

	gm('./temp/resultGM2.png')
    .drawText(-192, -60, statement, 'center')
    .font('./fonts/CC Wild Words Bold Italic.ttf')
    .fontSize( fontSize + 'px' )
    .write( './temp/resultPersonDescription.png', function (err) {
    	if (err) {
    		throw err;
    	} else {
    		addName();
    	}
    });
}

function addName(){
	gm('./temp/resultPersonDescription.png')
//    .fill('#FFFFFF')
    .drawText(-144, 210, displayName.replace(/ /g, "\n"), 'center')
    .font('./fonts/CC Wild Words Bold Italic.ttf')
    .fontSize( '13px' )
    .write( './temp/resultWithText.png', function (err) {
    	if (err) {
    		throw err;
    	} else {
    		channel.send({ files: ['./temp/resultWithText.png'] });
    	}
    });
}

export default makeMeme;