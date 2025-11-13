import { FormEvent, useState } from 'react';
import { Text, Spinner } from '@vkontakte/vkui';
import { useModalStore } from '@/shared/model/modalStore';
import { showModal } from '../lib/showModal';
import { apiService, telegramService } from '@/services';
import {
  ManualInputFormState,
  validateValues,
  prepareRequestData,
} from './helpers';
import { CenteredDiv } from './styles';

export function useManualInputForm() {
  const { openModal } = useModalStore.getState();

  const [values, setValues] = useState<ManualInputFormState>({
    fn: '',
    fd: '',
    fp: '',
    sumRub: '',
    sumKop: '',
    date: null,
    time: '',
  });

  const [errors, setErrors] = useState<
    Record<keyof ManualInputFormState, string | null>
  >({
    fn: null,
    fd: null,
    fp: null,
    sumRub: null,
    sumKop: null,
    date: null,
    time: null,
  });
  const [pending, setPending] = useState(false);

  const handleChange = (
    field: keyof ManualInputFormState,
    value: string | Date | null,
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validateValues(values);
    setErrors(nextErrors);
    if (!Object.values(nextErrors).every((v) => v === null)) return;

    const userId = telegramService.getUser()?.id;
    if (!userId) {
      openModal({
        title: 'Ошибка',
        closable: true,
        content: <Text>Не удалось определить id пользователя</Text>,
      });
      return;
    }

    const { formattedDate, sum } = prepareRequestData(values);

    openModal({
      title: 'Проверка чека',
      closable: false,
      content: (
        <CenteredDiv>
          <Text>Отправляем чек на проверку. Это займёт какое-то время.</Text>
          <Spinner size="m" style={{ marginTop: 8 }} />
        </CenteredDiv>
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

      const message =
        resp.data.message ??
        'После проверки мы зарегистрируем чек, начислим вам снежинки и пришлём уведомление об этом.';
      showModal('Проверка чека', message, true, 'Хорошо');
    } catch {
      showModal(
        'Упс!',
        'что-то пошло не так. Попробуй повторить позже',
        true,
      );
    } finally {
      setPending(false);
    }
  };

  return { values, errors, pending, handleChange, handleSubmit };
}
