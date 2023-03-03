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

  numbers.forEach((num) => {
    num.addEventListener("click", (e) => {
      //старт и не нажата .
      if (res === null && e.target.innerText !== ".") {
        expression.innerHTML += e.target.innerText;
        res = e.target.innerText;
        result.innerHTML = e.target.innerText;
      }
      // старт и нажата . с проверкой, что нажимается не 2 раз
      else if (res === null && e.target.innerText === "." && decimal) {
        expression.innerHTML += "0.";
        res += "0.";
        decimal = false;
        result.innerHTML = "0.";
      }
      // ввод числа начался
      else if (res !== null) {
        //если не было введено . то продолжаем ввод числа
        if (decimal) {
          expression.innerHTML += e.target.innerText;
          result.innerHTML = e.target.innerText;
        }
      }
    });
  });
  operators.forEach((operator) => {
    operator.addEventListener("click", (e) => {
      console.log(e.target.innerText);
    });
  });
  clear.addEventListener("click", () => {
    expression.innerHTML = null;
    result.innerHTML = 0;
    res = null;
  });

  const calc = (value) => {};
});
