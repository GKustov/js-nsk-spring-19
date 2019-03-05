/**
 * Напишите функцию sum(x), вычисляющую суммы подобным образом:
 * sum() === 0
 * sum(1)(2)() === 3
 * sum(1)(2)(3)() === 6
 *
 * Возможно чуть более понятная нотация для любителей функциональщины:
 * sum :: Number -> sum
 * sum :: void -> Number
 *
 * @param {*} x число или undefined
 * @returns а это уже сами решите
 */
export function sum(x) {
  const res = { r: 0 };

  if (x !== undefined) {
    res.r = this !== window ? this.r + x : x;
    const rebind = sum.bind(res);

    return rebind;
  }
  return this.r !== undefined ? this.r : 0;
}
