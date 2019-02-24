/**
 * Напишите функцию rle(input), реализующую примитивное RLE-сжатие входящей строки input.
 * Подробнее об RLE: https://ru.wikipedia.org/wiki/Кодирование_длин_серий
 *
 * Входящая строка сооттветствует regex паттерну /^[A-Z]+$/
 *
 * Пример:
 * rle('AAAB') === 'A3B'
 * rle('BCCDDDEEEE') === 'BC2D3E4'
 *
 * Больше примеров в тестах.
 *
 * @param  {string} input
 * @return {string}
 */
function callback(element, index, words) {
  if (index > 0) {
    if (element === words[index - 1]) {
      this[this.length - 1]++;
      return false;
    }
  }
  this.push(1);
  return true;
}
export function rle(input) {
  const words = input.split('');

  const count = [];

  const newArray = words.filter(callback, count);

  for (let i = 0; i < newArray.length; i++) { if (count[i] > 1) { newArray[i] += count[i].toString(); } }
  return (newArray.join(''));
}
