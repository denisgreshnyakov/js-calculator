window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  //получаем необходимые элементы на странице
  const numbers = document.querySelectorAll(".num");
  const operators = document.querySelectorAll(".operator");
  const clear = document.querySelector(".clear");
  const equals = document.querySelector(".equals");
  const expression = document.querySelector(".expression");
  const result = document.querySelector(".result");

  let res = null; // промежуточный результат ввода
  let decimal = true; // проверка на наличие . в числе
  let initial = false; //проверка на начало ввода чисел в калькулятор
  let zero = false; //проверка на 0 на старте
  let limit = false; // проверка на лимит размера числа
  let prevOp = null; // для записи предыдущего знака оператора
  let firstOp = false; // учитывать, что введен первый знак оператора, например +
  let secondOp = false; // учитывать, что введен второй знак оператора, например +-
  let prevRes = null; // запомнить предыдущий результат вычисления выражения

  // вешаем события на данные элементы
  numbers.forEach((num) => {
    num.addEventListener("click", (e) => checkNum(e));
  });
  operators.forEach((operator) => {
    operator.addEventListener("click", (e) => checkOperator(e));
  });
  clear.addEventListener("click", () => cleanAll());
  equals.addEventListener("click", () => getResult());

  // проверка корректного ввода чисел
  const checkNum = (e) => {
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
      result.innerHTML = e.target.innerText;
      res = e.target.innerText;
      initial = true;
    }
    // старт и нажата . с проверкой, что нажимается не 2 раз
    else if (initial === false && e.target.innerText === "." && decimal) {
      expression.innerHTML += "0.";
      result.innerHTML = "0.";
      res = "0.";
      decimal = false;
      initial = true;
    }
    // старт и нажат первым 0
    else if (
      initial === false &&
      e.target.innerText !== "." &&
      e.target.innerText === "0"
    ) {
      expression.innerHTML += e.target.innerText;
      result.innerHTML = e.target.innerText;
      res = e.target.innerText;
      initial = true;
      zero = true;
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
        let strExp = expression.innerHTML;
        strExp = strExp.replaceAt(strExp.length - 1, e.target.innerText);
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
  };

  // проверка корректного ввода знаков +-/*
  const checkOperator = (e) => {
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
  };

  // сброс всех параметров
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

  // посчитать введеное выражение
  const getResult = () => {
    const str = expression.innerHTML;
    const res = eval(str.replaceAll("x", "*"));
    expression.innerHTML = str + `=${res}`;
    result.innerHTML = res;
    prevRes = res;
  };
});
