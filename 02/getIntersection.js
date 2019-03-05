/**
 * Напишите функцию getIntersection(first, second), возвращающую
 * массив из общих значений массивов first и second.
 *
 * Результирующий массив должен быть отсортирован по возрастанию.
 *
 * Пример:
 * getIntersection([1, 3, 5, 7, 9], [1, 2, 3, 4]); //  [1, 3]
 * getIntersection([1, 1, 2], [2, 1, 1, 1]); // [1, 1, 2]
 *
 * @param  {number[]} first исходные массивы
 * @param  {number[]} second исходные массивы
 * @return {number[]} массив значений, отсортированный по возрастанию
 */
export function getIntersection(first, second) {
  function add(el) {
    if (this.has(el)) {
      this.set(el, this.get(el) + 1);
    } else {
      this.set(el, 1);
    }
  }
  const fmap = new Map();

  const smap = new Map();

  first.map(add, fmap);
  second.map(add, smap);
  const result = [];

  fmap.forEach((val, el) => {
    if (smap.has(el)) {
      const min = Math.min(smap.get(el), val);

      for (let i = 0; i < min; i++) {
        result.push(el);
      }
    }
  });
  result.sort((a, b) => a - b);
  return result;
}
