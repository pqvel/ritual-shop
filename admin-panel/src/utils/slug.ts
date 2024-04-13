export const slugify = (text: string): string => {
	return text
		.toLowerCase()
		.replace(/\s+/g, "-") // заменяем пробелы на дефисы
		.replace(/[^\w\-а-яё]+/g, "") // удаляем все символы, кроме букв, цифр, дефисов и букв русского алфавита
		.replace(/\-\-+/g, "-") // заменяем два и более дефисов подряд на один дефис
		.replace(/^-+/, "") // удаляем дефисы в начале строки
		.replace(/-+$/, ""); // удаляем дефисы в конце строки
};
