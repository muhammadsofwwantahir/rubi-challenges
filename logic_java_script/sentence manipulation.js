function stringManipulation(word) {
    if (word.charAt(0) === 'a' ||
        word.charAt(0) === 'i' ||
        word.charAt(0) === 'u' ||
        word.charAt(0) === 'e' ||
        word.charAt(0) === '0') {
        return true;
    }
}

function sentenceManipulation(sentence) {
    var kata = sentence.split('-');
    console.log(kata);
    var hasil = '';
    for (let i = 0; i < kata.length; i++) {
        if (stringManipulation(kata[i])) {
            hasil += kata[i] + ' '
        }else{
            hasil += kata[i].slice(1, kata[i].length).concat(kata[i][0] + 'nyo ');
        }
    }
    console.log(hasil);
}


sentenceManipulation('ibu-pergi-ke-pasar-bersama-aku')