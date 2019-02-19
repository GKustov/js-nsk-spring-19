/**
 * Напишите функцию passwordCheck(password), принимающую строку password
 * и проверяющую её на сложность. Если сложность достаточна, вернуть true,
 * иначе - false.
 *
 * Достаточной сложность считается, если в строке:
 * - Есть хотя бы одно число
 * - Есть хотя бы две буквы латинского алфавита в разных регистрах
 * - Есть хотя бы один символ из ряда ! ? . , + - * / =
 * - Содержит не менее 10 символов
 *
 * Пример:
 * passwordCheck('Nagibator777') === false
 * passwordCheck('password') === false
 * passwordCheck('This is the 7th password I have come up with!') === true
 *
 * Больше примеров в тестах.
 *
 * @param  {string} password пароль
 * @return {boolean}
 */
export function passwordCheck(password) {
  const check1 = password.match(/[1-9]/) !== null;

  const up = password.match(/[A-Z]/g);

  const down = password.match(/[a-z]/g);

  const check21 = up !== null && up.length > 1;

  const check22 = down !== null && down.length > 1;

  const check3 = password.match(/[!?.,+*/=]/) !== null;

  const check4 = password.length > 9;

  return (check1 && check21 && check22 && check3 && check4);
}
