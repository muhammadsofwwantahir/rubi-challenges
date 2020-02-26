function deretkaskus(n) {
    var j = []
   
    for (var k = 1; k <= n; k++) {
      a =k * 3;
      if (a % 5 === 0 && a % 6 === 0) {
        j.push("KASKUS");
      } else if (a % 6 === 0) {
        j.push("KUS");
      } else if (a % 5 === 0) {
        j.push("KAS");
      } else {
        j.push(a);
      }
    }
    return j;
  }
  
  
  console.log(deretkaskus(10));