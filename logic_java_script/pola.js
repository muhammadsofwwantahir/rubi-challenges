// function pola(str) {

//     var pecahPola = str.split(' ');

//     var Simpan = [];

//     for (var i = 0; i < 10; i++) {

//         for (var j = 0; j < 10; j++) {

//             if ((pecahPola[0].replace('#', i)) * pecahpola[2] == pecahPola[4].replace('#', j)) {
//                 Simpan.push(i, j)
//             }
//         }
//     }

//     return Simpan;

// }

// console.log(pola("42#3 * 188 = 80#204"));

// console.log(pola("8#61 * 895 = 78410#5"));

function pola(str) {

    var pecahPola = str.split(' ');

    var Simpan = [];

    for (var i = 0; i < 10; i++) {

        for (var j = 0; j < 10; j++) {

            if ((pecahPola[0].replace('#', i)) * pecahPola[2] == pecahPola[4].replace('#', j)) {

                Simpan.push(i, j)

            }

        }

    }

    return Simpan;

}

console.log(pola('42#3 * 188 = 80#204'));

console.log(pola('8#61 * 895 = 78410#5'));