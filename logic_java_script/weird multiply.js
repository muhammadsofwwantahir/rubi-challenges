function wiredMultiply(sentence) {
    let stringMultiply = sentence.toString();


    if (stringMultiply.length > 1) {
        let result = 1;
        for (let i = 0; i < stringMultiply.length; i++) {
            result *= stringMultiply[i];
        }
        return wiredMultiply(result);

    } else {
        return sentence;
    }

}
console.log(wiredMultiply(39));
console.log(wiredMultiply(999));
console.log(wiredMultiply(3));