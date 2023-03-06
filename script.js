window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const numbers = document.querySelectorAll(".num");
  const operators = document.querySelectorAll(".operator");
  const clear = document.querySelector(".clear");
  const equals = document.querySelector(".equals");
  const expression = document.querySelector(".expression");
  const result = document.querySelector(".result");

  // 5x1+5+921233+5x6-2/40005..010.5-5.55x-55-2/22/7

  let res = null;
  let decimal = true;
  let initial = false;
  let zero = false;
  let limit = false;
  let prevOp = null;
  let firstOp = false;
  let secondOp = false;

  numbers.forEach((num) => {
    num.addEventListener("click", (e) => {
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
          expression.innerHTML += ".";
          result.innerHTML = "0.";
          res = "0.";
          zero = false;
          decimal = false;
        }
        // если на старте был уже введен 0 и вводится число кроме 0 и .
        else if (zero && e.target.innerText !== "0") {
          expression.innerHTML = e.target.innerText;
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
      // самый первый знак
      if (expression.innerHTML.length <= 1 && !initial) {
        console.log("самый первый знак");
        expression.innerHTML = e.target.innerText;
        result.innerHTML = e.target.innerText;
        initial = false;
        decimal = true;
        limit = false;
        return;
      }
      // первый знак не ввели
      if (!firstOp) {
        console.log("первый знак не ввели");
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
        console.log("первый знак уже введен");
        //если второй знак минус то его добавляем
        if (e.target.innerText === "-" && !secondOp) {
          console.log("если второй знак минус то его добавляем");
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
          console.log("если это не -, тогда мы меняем знак на другой");
          let strExp = expression.innerHTML;
          let strRes = result.innerHTML;

          strExp = strExp.replaceAt(strExp.length - 1, e.target.innerText);
          strRes = strExp.replaceAt(strRes.length - 1, e.target.innerText);

          expression.innerHTML = strExp;
          result.innerHTML = e.target.innerText;

          prevOp = e.target.innerText;
          // secondOp = true;

          initial = false;
          decimal = true;
          limit = false;
        }

        // два знака введено, больше нельзя
        else if (secondOp) {
          console.log("два знака введено, больше нельзя");
          return;
        }
      }
    });
  });

  clear.addEventListener("click", () => {
    expression.innerHTML = null;
    result.innerHTML = 0;
    initial = false;
    decimal = true;
    limit = false;
    res = null;
    firstOp = false;
    secondOp = false;
    prevOp = null;
  });

  String.prototype.replaceAt = function (index, replacement) {
    if (index >= this.length) {
      return this.valueOf();
    }

    var chars = this.split("");
    chars[index] = replacement;
    return chars.join("");
  };

  const calc = (value) => {};
});
