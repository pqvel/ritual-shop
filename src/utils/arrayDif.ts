export const arrayDif = (
  arr1: string[],
  arr2: string[]
): [string[], string[]] => {
  // Создаем массивы для хранения уникальных элементов
  let uniqueInArr2: string[] = [];
  let uniqueInArr1: string[] = [];

  // Используем Set для быстрого поиска и проверки наличия элементов
  let set1 = new Set(arr1);
  let set2 = new Set(arr2);

  // Проходим по второму массиву и добавляем в uniqueInArr2 элементы, которых нет в set1
  for (let item of arr2) {
    if (!set1.has(item)) {
      uniqueInArr2.push(item);
    }
  }

  // Проходим по первому массиву и добавляем в uniqueInArr1 элементы, которых нет в set2
  for (let item of arr1) {
    if (!set2.has(item)) {
      uniqueInArr1.push(item);
    }
  }

  // Возвращаем оба массива
  return [uniqueInArr2, uniqueInArr1];
};
