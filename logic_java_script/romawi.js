function romawi(n) {
    var angka = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
    var roma = ["I", "IV", "V", "IX", "X", "XL", "L", "XC", "C", "CD", "D", "CM", "M"];
    var hasil = '';

    for (var i = 12; i >= 0; i--) {
        while (n >= angka[i]) {
            hasil += roma[i]; //memasukan angka romai ke variabel hasil
            n -= angka[i]; // menghitung sisa n jika sudah di temukan angka romawi awalnya

        }
    }

    return hasil


}

console.log("Script Testing untuk Konveri Romawi");
console.log("input | expected | result");
console.log("------|----------|-------");
console.log("4     | IV       |", romawi(4));
console.log("9     | IX       |", romawi(9));
console.log("13    | XIII     |", romawi(13));
console.log("1453  | MCDLIII  |", romawi(1453));
console.log("1646  | MDCXLVI  |", romawi(1646));