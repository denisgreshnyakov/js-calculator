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
  let op = false;
  let opValue = null;

  numbers.forEach((num) => {
    num.addEventListener("click", (e) => {
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
        op = true;
      }
      // старт и нажата . с проверкой, что нажимается не 2 раз
      else if (initial === false && e.target.innerText === "." && decimal) {
        expression.innerHTML += "0.";
        res += "0.";
        decimal = false;
        initial = true;
        result.innerHTML = "0.";
        res = "0.";
        op = true;
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
        op = true;
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
      console.log(op);
      console.log(initial);
      //Условие для первого знака оператора
      if (!op) {
        console.log("Условие для первого знака оператора");
        //если + или - нажат, то вставляем в выражение
        if (e.target.innerText === "+" || e.target.innerText === "-") {
          expression.innerHTML += e.target.innerText;
          result.innerHTML = e.target.innerText;
          initial = false;
          decimal = true;
          limit = false;
          op = true;
        }
      }
      // Условие для остальных знаков оператора
      else if (initial && op) {
        //если это первый знак
        console.log("знак посередине");
        console.log(opValue);
        console.log(e.target.innerText);
        if (opValue === null) {
          console.log(
            " Условие для остальных знаков оператора если это первый знак"
          );
          expression.innerHTML += e.target.innerText;
          result.innerHTML = e.target.innerText;
          initial = false;
          decimal = true;
          limit = false;
          op = true;
          opValue = e.target.innerText;
        }
        //если это второй знак +- -- *- /-
        else if (
          (opValue === "+" && e.target.innerText === "-") ||
          (opValue === "-" && e.target.innerText === "-") ||
          (opValue === "*" && e.target.innerText === "-") ||
          (opValue === "/" && e.target.innerText === "-")
        ) {
          console.log(
            " Условие для остальных знаков оператора если это второй знак +- -- *- /-"
          );
          expression.innerHTML += e.target.innerText;
          result.innerHTML = e.target.innerText;
          opValue = null;
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
    op = false;
    opValue = null;
  });

  const calc = (value) => {};
});
