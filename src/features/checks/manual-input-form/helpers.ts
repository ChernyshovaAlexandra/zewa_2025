import Helper from '@/helpers/Helper';

export interface ManualInputFormState {
  fn: string;
  fd: string;
  fp: string;
  sumRub: string;
  sumKop: string;
  date: Date | null;
  time: string;
}

export function validateValues(
  values: ManualInputFormState,
): Record<keyof ManualInputFormState, string | null> {
  return {
    fn: /^\d{10,16}$/.test(values.fn) ? null : 'Введите корректный ФН',
    fd: /^\d+$/.test(values.fd) ? null : 'Введите корректный ФД',
    fp: /^\d+$/.test(values.fp) ? null : 'Введите корректный ФП',
    sumRub: /^\d+$/.test(values.sumRub) ? null : 'Рубли — только цифры',
    sumKop: /^\d{2}$/.test(values.sumKop) ? null : 'Копейки — две цифры',
    date: values.date ? null : 'Выберите дату',
    time: values.time ? null : 'Выберите время',
  };
}

export function prepareRequestData(values: ManualInputFormState) {
  const [hours, minutes] = values.time.split(':').map(Number);
  const d = values.date as Date;
  const finalDate = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    hours,
    minutes,
  );
  const formattedDate = Helper.deFormatDate(finalDate);
  const sum = `${values.sumRub}${values.sumKop}`;
  return { formattedDate, sum };
}
