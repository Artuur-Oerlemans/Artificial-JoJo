var channel

// return an improved version of a name.
function improveName(message) {
    let args = message.content.split(" ").slice(1);
    channel = message.channel;

    //TODO: add check if the name is already perfect.

    channel.send("Your improved name is:")

    if (args.length == 0) {
        channel.send("MUDA");
    } else if (args.length == 1) {
        let chosenCase = pickCase(1);
        switch (chosenCase) {
            case 0:
                channel.send("JoJo");
            case 1:
                channel.send("JoJo");
        }
    }
}

function pickCase(numberOfCases) {
    return 0;
}


export default improveName;