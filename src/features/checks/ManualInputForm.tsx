import {
  Group,
  FormItem,
  FormLayoutGroup,
  Input,
  DateInput as DatePicker,
  Button,
  Text,
  Spinner,
  Div,
} from '@vkontakte/vkui';
import { FormEvent, useState } from 'react';
import { useModalStore } from '@/shared/model/modalStore';
import { apiService, telegramService } from '@/services';
import Helper from '@/helpers/Helper';

interface State {
  fn: string;
  fd: string;
  fp: string;
  sumRub: string;
  sumKop: string;
  date: Date | null;
  time: string;
}

export const ManualInputForm = () => {
  const { openModal } = useModalStore.getState();

  const [values, setValues] = useState<State>({
    fn: '',
    fd: '',
    fp: '',
    sumRub: '',
    sumKop: '',
    date: null,
    time: '',
  });
  const [errors, setErrors] = useState<Record<keyof State, string | null>>({
    fn: null,
    fd: null,
    fp: null,
    sumRub: null,
    sumKop: null,
    date: null,
    time: null,
  });
  const [pending, setPending] = useState(false);


  const handleChange = (field: keyof State, value: string | Date | null) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validate = (): boolean => {
    const next: typeof errors = {
      fn: /^\d{10,16}$/.test(values.fn) ? null : 'Введите корректный ФН',
      fd: /^\d+$/.test(values.fd) ? null : 'Введите корректный ФД',
      fp: /^\d+$/.test(values.fp) ? null : 'Введите корректный ФП',
      sumRub: /^\d+$/.test(values.sumRub) ? null : 'Рубли — только цифры',
      sumKop: /^\d{2}$/.test(values.sumKop) ? null : 'Копейки — две цифры',
      date: values.date ? null : 'Выберите дату',
      time: values.time ? null : 'Выберите время',
    };
    setErrors(next);
    return Object.values(next).every((v) => v === null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const userId = telegramService.getUser()?.id;
    if (!userId) {
      openModal({
        title: 'Ошибка',
        closable: true,
        content: <Text>Не удалось определить id пользователя</Text>,
      });
      return;
    }

    const [hours, minutes] = values.time.split(':').map(Number);
    const d = values.date as Date;
    const finalDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hours, minutes);
    const formattedDate = Helper.deFormatDate(finalDate);
    const sum = `${values.sumRub}${values.sumKop}`;

    /* прелоадер */
    openModal({
      title: 'Проверка чека',
      closable: false,
      content: (
        <Div style={{ textAlign: 'center' }}>
          <Text>Отправляем чек на проверку. Это займёт какое-то время.</Text>
          <Spinner size="m" style={{ marginTop: 8 }} />
        </Div>
      ),
    });

    setPending(true);
    try {
      const resp = await apiService.addCheck({
        telegram_id: userId,
        fn: values.fn,
        fd: values.fd,
        fp: values.fp,
        sum,
        date: formattedDate,
      });

      openModal({
        title: 'Проверка чека',
        closable: true,
        content: (
          <Text>
            {resp.data.message ??
              'После проверки мы зарегистрируем чек, начислим вам монеты и пришлём уведомление об этом.'}
          </Text>
        ),
      });
    } catch {
      openModal({
        title: 'Ошибка',
        closable: true,
        content: <Text>Сеть недоступна или сервер не отвечает</Text>,
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <Group mode="plain">
      <form style={{ textAlign: 'left' }} onSubmit={handleSubmit}>
        <FormItem>
          <Text weight="3" style={{ textAlign: 'center', marginBottom: 12 }}>
            Введите код из чека в нужное поле
          </Text>
        </FormItem>

        <FormItem top="ФН" status={errors.fn ? 'error' : 'default'} bottom={errors.fn ?? undefined}>
          <Input
            type="number"
            value={values.fn}
            placeholder="Введите данные"
            onChange={(e) => handleChange('fn', e.target.value)}
          />
        </FormItem>

        <FormItem top="ФД" status={errors.fd ? 'error' : 'default'} bottom={errors.fd ?? undefined}>
          <Input
            type="number"
            value={values.fd}
            placeholder="Введите данные"
            onChange={(e) => handleChange('fd', e.target.value)}
          />
        </FormItem>

        <FormItem top="ФП" status={errors.fp ? 'error' : 'default'} bottom={errors.fp ?? undefined}>
          <Input
            type="number"
            value={values.fp}
            placeholder="Введите данные"
            onChange={(e) => handleChange('fp', e.target.value)}
          />
        </FormItem>

        {/* Сумма */}
        <FormItem top="Сумма">
          <FormLayoutGroup mode="horizontal">
            <FormItem
              top="руб."
              status={errors.sumRub ? 'error' : 'default'}
              bottom={errors.sumRub ?? undefined}
            >
              <Input
                type="number"
                value={values.sumRub}
                onChange={(e) => handleChange('sumRub', e.target.value)}
              />
            </FormItem>
            <FormItem
              top="коп."
              status={errors.sumKop ? 'error' : 'default'}
              bottom={errors.sumKop ?? undefined}
            >
              <Input
                type="number"
                value={values.sumKop}
                onChange={(e) => handleChange('sumKop', e.target.value)}
              />
            </FormItem>
          </FormLayoutGroup>
        </FormItem>

        {/* Дата + время */}
        <FormItem top="Дата и время">
          <FormLayoutGroup mode="horizontal">
            <FormItem
              top="Дата"
              status={errors.date ? 'error' : 'default'}
              bottom={errors.date ?? undefined}
            >
              <DatePicker
                value={values.date}
                onChange={(v) => handleChange('date', v ? (v as Date) : null)}
                closeOnChange
              />
            </FormItem>
            <FormItem
              top="Время"
              status={errors.time ? 'error' : 'default'}
              bottom={errors.time ?? undefined}
            >
              <Input
                type="time"
                value={values.time}
                onChange={(e) => handleChange('time', e.target.value)}
              />
            </FormItem>
          </FormLayoutGroup>
        </FormItem>

        {/* submit */}
        <FormItem>
          <Button size="l" stretched mode="primary" loading={pending} type="submit">
            Отправить
          </Button>
        </FormItem>
      </form>
    </Group>
  );
};
