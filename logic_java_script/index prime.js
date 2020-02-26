// function indexPrime(param1) {
//     let number = 2;
//     let count = 0;
//     while (count < param1) {
//         let isPrime = true;
//         for (var i = 2; i <= Math.sqrt(number); i++) {
//             if (number % i == 0) {
//                 isPrime = false;
//             }
//         }
//         if (isPrime) {
//             count++;
//         }
//         number++;
//     }
//     return number - 1;
// }

// console.log(indexPrime(4));
// console.log(indexPrime(500));
// console.log(indexPrime(37786));

function indexPrime(param1) {
    let n = 2;
    let i = 0;
    while (i < param1) {
        let prime = true;
        for (let a = 2; a < n; a++)
            if (n % a === 0) prime = false;
        if (prime) {
            i++;
        }
        n++;
    }
    return n - 1;
}

console.log(indexPrime(4))
console.log(indexPrime(500))
console.log(indexPrime(37786))