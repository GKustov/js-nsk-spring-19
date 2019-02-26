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
    function count (acc, el) {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
      };

    let farr = first.toLowerCase().split('').reduce(count, {});
    let sarr = second.toLowerCase().split('').reduce(count, {});
    let firstkeys = Object.keys(farr);
    let secondkeys = Object.keys(sarr);
    let result = true;
    if(firstkeys.length === secondkeys.length) {
        firstkeys.forEach(el => {
            if(farr[el] !== sarr[el]) {
                result= false;
            }
        });
    } else {
        result= false;
    }
    return result;
}

