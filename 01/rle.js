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
export function rle(input) {
    let prev = '';
    let res = '';
    let count = 0;
    let i =0;
    for(; i< input.length; i++)
    {
        if(input[i]===prev)
            ++count;
        else
        {
            addNew();
        }
    }
    addNew();
    function addNew()
    {
        res+=prev;
            if(count>1)
            {
                res+=count.toString();
            }
            prev = input[i];
            count = 1;
    }
    return res;
}
