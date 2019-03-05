/**
 * Напишите функцию anagram(first, second), определяющую,
 * являются ли переданные строки first и second анаграммами.
 *
 * Пример:
 * anagram('просветитель', 'терпеливость') === true
 *
 * Больше примеров в тестах.
 *
 * @param  {string} first первая строка
 * @param  {string} second вторая строка
 * @return {boolean}
 */
export function anagram(first, second) {
  let fres = first.toLowerCase().split('').sort().join();

  let sres = second.toLowerCase().split('').sort().join();

  return fres === sres;
}
