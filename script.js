window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const numbers = document.querySelectorAll(".num");
  const operators = document.querySelectorAll(".operator");
  const clear = document.querySelector(".clear");
  const equals = document.querySelector(".equals");
  const expression = document.querySelector(".expression");
  const result = document.querySelector(".result");

  let res = null;
  let decimal = true;
  let initial = false;
  let zero = false;
  let limit = false;
  let prevOp = null;
  let firstOp = false;
  let secondOp = false;
  let prevRes = null;

  numbers.forEach((num) => {
    num.addEventListener("click", (e) => {
      //проверка на предыдущий результат
      if (prevRes !== null) {
        cleanAll();
      }
      //сброс операторов /*-+
      if (prevOp !== null) {
        firstOp = false;
        secondOp = false;
        prevOp = null;
        result.innerHTML = null;
      }
      //проверка лимита
      if (result.innerHTML.length === 22 || limit) {
        limit = true;
        result.innerHTML = "digit limit met";
        setTimeout(() => {
          result.innerHTML = res;
        }, 1000);
        return;
      }
      //старт и не нажата . и 0
      if (
        initial === false &&
        e.target.innerText !== "." &&
        e.target.innerText !== "0"
      ) {
        expression.innerHTML += e.target.innerText;
        initial = true;
        result.innerHTML = e.target.innerText;
        res = e.target.innerText;
      }
      // старт и нажата . с проверкой, что нажимается не 2 раз
      else if (initial === false && e.target.innerText === "." && decimal) {
        expression.innerHTML += "0.";
        res += "0.";
        decimal = false;
        initial = true;
        result.innerHTML = "0.";
        res = "0.";
      }
      // старт и нажат первым 0
      else if (
        initial === false &&
        e.target.innerText !== "." &&
        e.target.innerText === "0"
      ) {
        expression.innerHTML += e.target.innerText;
        initial = true;
        zero = true;
        result.innerHTML = e.target.innerText;
        res = e.target.innerText;
      }
      // ввод числа начался
      else if (initial === true) {
        //если на старте был уже введен 0 и вводится 0
        if (zero && e.target.innerText === "0") {
          result.innerHTML = "0";
          res = "0";
        }
        // если на старте был уже введен 0 и вводится .
        else if (zero && e.target.innerText === ".") {
          console.log(`сработал этот блок`);
          expression.innerHTML += ".";
          result.innerHTML = "0.";
          res = "0.";
          zero = false;
          decimal = false;
        }
        // если на старте был уже введен 0 и вводится число кроме 0 и .
        else if (zero && e.target.innerText !== "0") {
          let strExp = expression.innerHTML;

          strExp = strExp.replaceAt(strExp.length - 1, e.target.innerText);

          // expression.innerHTML = e.target.innerText;
          // result.innerHTML = e.target.innerText;

          expression.innerHTML = strExp;
          result.innerHTML = e.target.innerText;
          res = e.target.innerText;
          zero = false;
        }
        //если не было введено . то продолжаем ввод числа
        else if (decimal && e.target.innerText !== ".") {
          expression.innerHTML += e.target.innerText;
          result.innerHTML += e.target.innerText;
          res += e.target.innerText;
        }
        //если вводим число и первый раз нажимаем . то учитываем это
        else if (decimal && e.target.innerText === ".") {
          expression.innerHTML += e.target.innerText;
          result.innerHTML += e.target.innerText;
          res += e.target.innerText;
          decimal = false;
        }
        //если . уже была поставлена
        else if (decimal === false && e.target.innerText !== ".") {
          expression.innerHTML += e.target.innerText;
          result.innerHTML += e.target.innerText;
          res += e.target.innerText;
        }
      }
    });
  });

  operators.forEach((operator) => {
    operator.addEventListener("click", (e) => {
      //проверка на предыдущий результат
      if (prevRes !== null) {
        expression.innerHTML = prevRes;
        result.innerHTML = null;
        prevRes = null;
      }
      // самый первый знак
      if (expression.innerHTML.length <= 1 && !initial) {
        expression.innerHTML = e.target.innerText;
        result.innerHTML = e.target.innerText;
        initial = false;
        decimal = true;
        limit = false;
        return;
      }
      // первый знак не ввели
      if (!firstOp) {
        expression.innerHTML += e.target.innerText;
        result.innerHTML = e.target.innerText;
        prevOp = e.target.innerText;
        firstOp = true;

        initial = false;
        decimal = true;
        limit = false;
      }
      // первый знак уже введен
      else if (firstOp) {
        //если второй знак минус то его добавляем
        if (e.target.innerText === "-" && !secondOp) {
          expression.innerHTML += e.target.innerText;
          result.innerHTML = e.target.innerText;
          prevOp = e.target.innerText;
          secondOp = true;

          initial = false;
          decimal = true;
          limit = false;
        }
        // если это не -, тогда мы меняем знак на другой
        else if (e.target.innerText !== "-" && !secondOp) {
          let strExp = expression.innerHTML;

          strExp = strExp.slice(0, strExp.length - 1) + e.target.innerText;

          expression.innerHTML = strExp;
          result.innerHTML = e.target.innerText;

          prevOp = e.target.innerText;

          initial = false;
          decimal = true;
          limit = false;
        }

        // два знака введено, больше нельзя
        else if (secondOp) {
          if (e.target.innerText !== "-") {
            let strExp = expression.innerHTML;

            expression.innerHTML =
              strExp.slice(0, strExp.length - 2) + e.target.innerText;
            result.innerHTML = e.target.innerText;
            secondOp = false;
          }
          return;
        }
      }
    });
  });

  const cleanAll = (e) => {
    expression.innerHTML = null;
    result.innerHTML = 0;
    initial = false;
    decimal = true;
    limit = false;
    res = null;
    firstOp = false;
    secondOp = false;
    prevOp = null;
    prevRes = null;
    zero = false;
  };

  clear.addEventListener("click", cleanAll);

  // 0 0 0 AC . 5 в итоге 05
  // ac 000 ac 5 . . 0 ac
  // 5x1+5+921233+5x6-2/40005..010.5-5.55x-55-2/22/7
  //-2+2*2=2
  //2222222222222222222222+3222222222555888774444=5.444444444778111e+21 3222222222555888774444???

  equals.addEventListener("click", (e) => {
    let str = expression.innerHTML;
    let res = eval(str.replaceAll("x", "*"));
    console.log(str + `=${res}`);
    expression.innerHTML = str + `=${res}`;
    result.innerHTML = res;
    prevRes = res;
  });
});
