let number1 = +prompt("Введите первое число");
let number2 = +prompt("Введите второе число");

function isSimpleNumber(number1,number2) {
  if (number1<number2) {
    for (let i = number1; i<=number2; i++){
      for (letj = i; j<number2; j++){
        if (j % i < 0) {
          console.log()
        }
      }
    }
  } else {
    console.log('первое число больше второго.')
  }
}

isSimpleNumber(number1, number2);