export const formatDate = (date: Date): string => {
  const addLeadingZero = (num: number): string =>
    num < 10 ? "0" + num : num.toString();

  const day = addLeadingZero(date.getDate());
  const month = addLeadingZero(date.getMonth() + 1); // Месяцы в JS начинаются с 0, поэтому добавляем 1
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};
