function stringManipulation(word) {
    if (word.charAt(0) === 'a' || word.charAt(0) === 'i' || word.charAt(0) === 'u' || word.charAt(0) === 'e' || word.charAt(0) === '0') {
        return word;
    } else {
        var checkWord = word.slice(1, word.length).concat(word[0], 'nyo');
        return checkWord;
    }
}

function sentenceManipulation(sentence) {
    var sentenceArray = sentence.split(" ");
    for (var i = 0; i < sentenceArray.length; i++) {
        sentenceArray[i] = stringManipulation(sentenceArray[i]);
    }
    var newSentence = sentenceArray.toString().replace(/,/g, " ");
    return newSentence;
}


function konversi() {
    rl.on('line', (input) => {
        if (input !== "Good bye!") {
            console.log("hasil konversi: " + sentenceManipulation(`${input}`));
            rl.prompt();
        } else {
            rl.close()

        }


    });
}

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'tulis kalimatmu di sini > '
});
rl.prompt();
konversi();