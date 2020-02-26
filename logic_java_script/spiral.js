function spiral(param1) {
    var index = 0;
    const simpan = [];

    for (var i = 0; i < param1; i++) {
        const result = [];
        for (var j = 0; j < param1; j++) {
            result.push(index);
            index++;
        }
        simpan.push(result);

    }

    const number = []

    var startCol = 0;
    var endCol = simpan[0].length;
    var startRow = 1;
    var endRow = simpan.length;
    var end = param1 - 1;
    var limit = 0;

    while (number.length < param1 * param1) {
        // ke kanan
        for (var i = startCol; i < endCol; i++) {
            number.push(simpan[startCol][i]);
        }

        // ke bawah
        for (var i = startRow; i < endRow; i++) {
            number.push(simpan[i][end]);
        }

        // ke kiri
        for (var i = endCol - 2; i >= limit; i--) {
            number.push(simpan[end][i]);
        }

        // ke atas
        for (var i = endRow - 2; i > limit; i--) {
            number.push(simpan[i][limit]);
        }

        startCol++;
        endCol--;
        startRow++;
        endRow--;
        limit++;
        end--;
    }

    console.log(number);



}

spiral(5);
spiral(6);
spiral(7);