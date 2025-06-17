/**
 * Заменяет пробелы между короткими словами на неразрывные (&nbsp;)
 */
export function applyNbsp(input: string): string {
  return input
    .replace(/(\s|^)([а-яА-ЯёЁa-zA-Z]{1,2}) /g, '$1$2\u00A0') // между короткими словами
    .replace(/(\d+) (\w+)/g, '$1\u00A0$2'); // число + слово (например: "5 баллов")
}
