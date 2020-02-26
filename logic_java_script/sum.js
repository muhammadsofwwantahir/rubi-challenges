function sum(){
    let sum = 0;
    for(let i = 0; i < arguments.length; i++){
        sum = sum + arguments[i];
    }
    console.log(sum)
}

sum(1,2,7);
sum(1,4);
sum(11);
sum(10,3,6,7,9);