/* Это задание хоть и небольшое, но хитрое, его иногда задают на собеседованиях. Если не получится его решить сразу – не сдавайтесь. Оно стоит того, чтобы разобраться самостоятельно.

magic.js
Реализуйте и экспортируйте по умолчанию функцию, которая работает следующим образом:

Принимает на вход любое количество аргументов и возвращает функцию, которая, в свою очередь, принимает на вход любое количество аргументов и так до бесконечности (привет, рекурсия ;)).
Аргументами могут быть только числа.
Результат вызова этой функции при проверке на равенство должен быть равен сумме всех аргументов всех подфункций.
import magic from './magic.js';

magic() == 0; // true
magic(5, 2, -8) == -1; // true
magic(1, 2)(3, 4, 5)(6)(7, 10) == 38; // true
magic(4, 8, 1, -1, -8)(3)(-3)(7, 2) == 13; // true
Алгоритм
Для решения задачи вам понадобится создать внутри ещё одну функцию.
Возврат функции из функции позволит сохранять результат предыдущих вычислений.
Функции - это объекты, используйте данную особенность. Она позволит отдавать результат вычислений только в нужный момент.
Внимательно изучите теорию, подумайте, каким "магическим" способом можно получить объект, работающий необходимым образом.
*/


// Решение kotano
// @ts-check
// BEGIN (write your solution here)
function magic(...nums) {
    const sum = nums.reduce((a, b) => a + b, 0);
    function newMagic(...newNums) {
      return magic(sum, ...newNums);
    }
    newMagic.valueOf = function valueOf() { return sum; };
    return newMagic;
  }
  // END

//   Решение учителя
  // @ts-check
  // BEGIN
  const f = (...numbers) => {
    const sum = numbers.reduce((acc, x) => (x + acc), 0);
    const inner = (...rest) => f(sum, ...rest);
    // функции - это объекты, что позволяет для "магического" метода установить свою функцию
    inner.valueOf = () => sum; // метод вызывается при сравнении, поэтому он возвращает только результат
    // подробнее о valueOf: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf
    return inner;
  };

  // END


// TESTS


describe('magic', () => {
  it('calculate sum', () => {
    expect(magic() + 0).toBe(0);
    expect(magic() + 1).toBe(1);
    expect(magic(5, 2, -8) + 2).toBe(1);
    expect(magic(1, 2)(3, 4, 5)(6)(7, 10) - 8).toBe(30);
    expect(magic(4, 8, 1, -1, -8)(3)(-3)(7, 2) + 7).toBe(20);
  });

  it('shouldn\'t have global state', () => {
    expect(magic() + 0).toBe(0);
    expect(magic() + 1).toBe(1);

    magic(4, 5);

    expect(magic(5, 2, -8) + 2).toBe(1);
    expect(magic(1, 2)(3, 4, 5)(6)(7, 10) - 8).toBe(30);
    expect(magic(4, 8, 1, -1, -8)(3)(-3)(7, 2) + 7).toBe(20);

    magic(1, 3, 4);
    expect(magic(5) + 1).toBe(6);
  });

  it('shouldn\'t have shared state', () => {
    const func = magic(4, 5);

    expect(func(5) + 1).toBe(15);
    expect(func(5) + 1).toBe(15);
  });
});