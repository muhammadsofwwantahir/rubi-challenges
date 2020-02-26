function stringManipulation(word) {
    if (word.charAt(0) === 'a' ||
        word.charAt(0) === 'i' || word.charAt(0) === 'u' || word.charAt(0) === 'e' || word.charAt(0) === '0') {
        console.log(word);

    } else {
        var k = word.slice(1, word.length).concat('nyo');
        console.log(k);

    }
}

stringManipulation('ayam');
stringManipulation('bebek');