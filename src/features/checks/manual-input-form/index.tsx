import {
  Group,
  FormItem,
  FormLayoutGroup,
  Input,
  DateInput as DatePicker,
  
} from '@vkontakte/vkui';
// import { ManualInputFormState } from './helpers';
import { useManualInputForm } from './useManualInputForm';
import { CenteredTitle, StyledForm } from './styles';
import { ZewaButton } from '@/shared/ui';

export function ManualInputForm() {
  const { values, errors, pending, handleChange, handleSubmit } = useManualInputForm();

  return (
    <Group mode="plain">
      <StyledForm onSubmit={handleSubmit}>
        <FormItem>
          <CenteredTitle weight="3">Введите код из чека в нужное поле</CenteredTitle>
        </FormItem>

        <FormItem top="ФН" status={errors.fn ? 'error' : 'default'} bottom={errors.fn ?? undefined}>
          <Input
            required
            type="number"
            value={values.fn}
            placeholder="Введите данные (16 цифр)"
            onChange={(e) => handleChange('fn', e.target.value)}
          />
        </FormItem>

        <FormItem top="ФД" status={errors.fd ? 'error' : 'default'} bottom={errors.fd ?? undefined}>
          <Input
            required
            type="number"
            value={values.fd}
            placeholder="Введите данные"
            onChange={(e) => handleChange('fd', e.target.value)}
          />
        </FormItem>

        <FormItem top="ФП" status={errors.fp ? 'error' : 'default'} bottom={errors.fp ?? undefined}>
          <Input
            required
            type="number"
            value={values.fp}
            placeholder="Введите данные"
            onChange={(e) => handleChange('fp', e.target.value)}
          />
        </FormItem>

        <FormItem>
          <FormLayoutGroup style={{ padding: 0 }} mode="horizontal">
            <FormItem
              top="Сумма руб."
              status={errors.sumRub ? 'error' : 'default'}
              bottom={errors.sumRub ?? undefined}
            >
              <Input
                required
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
                required
                type="number"
                value={values.sumKop}
                onChange={(e) => handleChange('sumKop', e.target.value)}
              />
            </FormItem>
          </FormLayoutGroup>
        </FormItem>

        <FormItem>
          <FormLayoutGroup style={{ padding: 0 }} mode="horizontal">
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
                required
                type="time"
                value={values.time}
                onChange={(e) => handleChange('time', e.target.value)}
              />
            </FormItem>
          </FormLayoutGroup>
        </FormItem>

        <FormItem>
          <ZewaButton
            style={{ width: '250px', margin: '10px auto 0' }}
            variant="blue-b"
            pending={pending}
            type="submit"
          >
            Отправить
          </ZewaButton>
        </FormItem>
      </StyledForm>
    </Group>
  );
}
