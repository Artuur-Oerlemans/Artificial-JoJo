var channel

// send garfield comic
function garfield(message) {
    //let args = message.content.split(" ").slice(1);
    channel = message.channel;

    var randomDate = randomGarfieldDate();
    var year = randomDate.getFullYear();
    // +1 as on the Garfield site, they first month and day is 1 not 0.
    var month = padWithZeroes(randomDate.getMonth() + 1);
    var day = padWithZeroes(randomDate.getDay() + 1)
    channel.send(year + "-" + month + "-" + day, { files: ["https://d1ejxu6vysztl5.cloudfront.net/comics/garfield/" + year + "/" + year + "-" + month + "-" + day + ".gif"] });
}

function padWithZeroes(i, length = 2) {
    var output = i.toString()
    while (output.length < length)
        output = "0" + output;
    return output;
}

function randomGarfieldDate() {
    var firstGarfield = new Date(1978, 6, 19, 0, 0, 0, 0);
    return randomDate(firstGarfield, new Date());
}

function randomDate(start, end) {
    var date = new Date(+start + Math.random() * (end - start));
    return date;
}

export default garfield;