/**
 * Возвращает текстовую форму в зависимости от количества товаров.
 *
 * @param {number} count - Количество товаров.
 * @param {string[]} words - Массив строк с формами слов для разных количеств товаров.
 * @returns {string} - Текстовая форма в зависимости от количества товаров.
 * @example
 * declensionNumber(5, ['товар', 'товара', 'товаров']); -> 5 товаров
 * declensionNumber(1, ['товар', 'товара', 'товаров']); -> 1 товар
 * declensionNumber(12, ['товар', 'товара', 'товаров']); -> 1 товаров
 * declensionNumber(22, ['товар', 'товара', 'товаров']); -> 1 товара
 *
 */
export const declensionTextByNumber = (
  count: number = 0,
  words: string[] = []
): string => {
  if (count === 0) {
    return words[2]; //  "Найдено 0 товаров";
  }

  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return words[2]; // `Найдено ${count} товаров`;
  }

  if (lastDigit === 1) {
    return words[0]; // `Найден ${count} товар`;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return words[1]; //`Найдено ${count} товара`;
  }

  return words[2]; // `Найдено ${count} товаров`;
};
