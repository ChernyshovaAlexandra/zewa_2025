// features/checks/lib/parseReceipt.ts
export interface ParsedReceipt {
  fn: string; // номер ФН
  fd: string; // номер ФД (i)
  fp: string; // ФПД
  sum: string; // копейки без точки: 24050
  date: string; // YYYY-MM-DD
}

// ────────────────────────────────────────────────────────────
// Регулярки для валидации
const FN_RE = /^\d{10,16}$/; // ФН 16-значный, иногда 10-12
const FD_RE = /^\d+$/; // ФД
const FP_RE = /^\d+$/; // ФПД
const DATE_RE = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})$/; // t=YYYYMMDDThhmm
const SUM_RE = /^\d+\.\d{2}$/; // s=xxx.xx
// ────────────────────────────────────────────────────────────

export function parseReceipt(raw: string): ParsedReceipt {
  // 1️⃣   извлекаем query-часть
  const query = raw.includes('?') ? raw.split('?')[1] : raw;
  const params = new URLSearchParams(query);

  // 2️⃣   базовая проверка
  const required = ['t', 's', 'fn', 'i', 'fp'];
  const missing = required.filter((p) => !params.has(p));
  if (missing.length) {
    throw new Error(`Отсутствуют поля: ${missing.join(', ')}`);
  }

  const t = params.get('t')!;
  const s = params.get('s')!;
  const fn = params.get('fn')!;
  const fd = params.get('i')!;
  const fp = params.get('fp')!;

  // 3️⃣   валидация значений
  if (!DATE_RE.test(t)) throw new Error('Некорректная дата в параметре t');
  if (!SUM_RE.test(s)) throw new Error('Некорректная сумма в параметре s');
  if (!FN_RE.test(fn)) throw new Error('fn не соответствует формату');
  if (!FD_RE.test(fd)) throw new Error('i (fd) – только цифры');
  if (!FP_RE.test(fp)) throw new Error('fp – только цифры');

  const date = t;
  const sum = s.replace('.', '');

  return { fn, fd, fp, sum, date };
}
