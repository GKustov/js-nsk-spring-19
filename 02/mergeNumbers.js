/**
 * Напишите функцию mergeNumbers(number), складывающую
 * все цифры числа number до тех пор, пока не получится
 * однозначный результат.
 *
 * Пример:
 * mergeNumbers(1) === 1
 * mergeNumbers(10001) === 2
 * mergeNumbers(15334232) === 5
 * mergeNumbers(50349814743854) === 2
 *
 * @param number
 */
export function mergeNumbers(number) {
  const str = String(number);

  if (str.length > 1) {
    const arr = str.split('');
    const newnums = String(Number.parseInt(arr.shift(), 10) + Number.parseInt(arr.shift(), 10)).split('');

    return mergeNumbers(Number.parseInt(newnums.concat(arr).join(''), 10));
  }
  return number;
}
