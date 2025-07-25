import { Form, Input, DatePicker, TimePicker, Flex } from 'antd';
import { Spinner } from '@vkontakte/vkui';
import styled from 'styled-components';
import { ZewaButton, Text } from '@/shared/ui';
import { useModalStore } from '@/shared/model/modalStore';
import { apiService, telegramService } from '@/services';
import Helper from '@/helpers/Helper';

const FIELD_HEIGHT = '45px';
const FIELD_BORDER = '1px solid #5C82C6';
const FIELD_RADIUS = '10px';

const StyledInput = styled(Input)`
  width: 100%;
  height: ${FIELD_HEIGHT};
  background: #fff;
  border: ${FIELD_BORDER};
  border-radius: ${FIELD_RADIUS};
  padding: 11px 12px;
  font-size: 16px;
  line-height: 20px;

  .ant-input-clear-icon {
    top: 50%;
    transform: translateY(-50%);
  }
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: ${FIELD_HEIGHT};
  background: #fff;
  border: ${FIELD_BORDER};
  border-radius: ${FIELD_RADIUS};
  padding: 11px 12px;

  .ant-picker-input > input {
    height: ${FIELD_HEIGHT};
    line-height: ${FIELD_HEIGHT};
    padding: 0;
  }
`;

const StyledTimePicker = styled(TimePicker)`
  width: 100%;
  height: ${FIELD_HEIGHT};
  background: #fff;
  border: ${FIELD_BORDER};
  border-radius: ${FIELD_RADIUS};
  padding: 11px 12px;

  .ant-picker-input > input {
    height: ${FIELD_HEIGHT};
    line-height: ${FIELD_HEIGHT};
    padding: 0;
  }
`;

const RowWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const SumWrapper = styled(RowWrapper)`
  & > .sum-rub {
    flex: 1 1 70%;
  }
  & > .sum-kop {
    flex: 1 1 30%;
  }
`;

const DateTimeWrapper = styled(RowWrapper)`
  & > .date-field {
    flex: 1 1 50%;
  }
  & > .time-field {
    flex: 1 1 50%;
  }
`;

export function ManualInputForm() {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    const { openModal } = useModalStore.getState();

    const userId = telegramService.getUser()?.id;
    if (!userId) {
      openModal({
        title: 'Ошибка',
        closable: true,
        content: (
          <Text size="p4" align="center">
            Не удалось определить id пользователя
          </Text>
        ),
      });
      return;
    }

    const date: Date = values.date?.toDate();
    const time: Date = values.time?.toDate();
    const finalDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
    );

    const formattedDate = Helper.deFormatDate(finalDate);
    const sum = `${values.sumRub}${String(values.sumKop).padStart(2, '0')}`;

    openModal({
      title: 'Проверка чека',
      closable: false,
      content: (
        <Flex vertical gap="10px" align="center">
          <Text size="p4" align="center">
            Отправляем чек на проверку. Это займёт какое-то время.
          </Text>
          <Spinner size="m" style={{ margin: '0 auto' }} />
        </Flex>
      ),
    });

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
          <Text size="p4" align="center">
            {resp.data.message ??
              'После проверки мы зарегистрируем чек, начислим вам монеты и пришлём уведомление об этом.'}
          </Text>
        ),
      });
    } catch (err) {
      openModal({
        title: 'Ошибка',
        closable: true,
        content: (
          <Text size="p4" align="center">
            Сеть недоступна или сервер не отвечает
          </Text>
        ),
      });
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Text size="p4" align="center" style={{ marginBottom: 12 }}>
        Введите код из чека в нужное поле
      </Text>

      <Form.Item
        label="ФН"
        name="fn"
        rules={[
          { required: true, message: 'Введите ФН' },
          { pattern: /^\d{10,16}$/, message: 'Только цифры' },
        ]}
        style={{ marginBottom: '8px' }}
      >
        <StyledInput allowClear placeholder="Введите данные" />
      </Form.Item>

      <Form.Item
        label="ФД"
        name="fd"
        rules={[
          { required: true, message: 'Введите ФД' },
          { pattern: /^\d+$/, message: 'Только цифры' },
        ]}
        style={{ marginBottom: '8px' }}
      >
        <StyledInput allowClear placeholder="Введите данные" />
      </Form.Item>

      <Form.Item
        label="ФП"
        name="fp"
        rules={[
          { required: true, message: 'Введите ФП' },
          { pattern: /^\d+$/, message: 'Только цифры' },
        ]}
        style={{ marginBottom: '8px' }}
      >
        <StyledInput allowClear placeholder="Введите данные" />
      </Form.Item>

      <Form.Item label="Сумма" style={{ marginBottom: '8px' }}>
        <SumWrapper>
          <Form.Item
            name="sumRub"
            noStyle
            rules={[
              { required: true, message: 'Рубли' },
              { pattern: /^\d+$/, message: 'Только цифры' },
            ]}
            style={{ marginBottom: '8px' }}
          >
            <StyledInput className="sum-rub" placeholder="руб." />
          </Form.Item>
          <Form.Item
            name="sumKop"
            noStyle
            rules={[
              { required: true, message: 'Копейки' },
              { pattern: /^\d{2}$/, message: 'Две цифры' },
            ]}
            style={{ marginBottom: '8px' }}
          >
            <StyledInput className="sum-kop" placeholder="коп." />
          </Form.Item>
        </SumWrapper>
      </Form.Item>

      <Form.Item label="Дата и время" style={{ marginBottom: '8px' }}>
        <DateTimeWrapper>
          <Form.Item
            name="date"
            noStyle
            rules={[{ required: true, message: 'Выберите дату' }]}
            style={{ marginBottom: '8px' }}
          >
            <StyledDatePicker className="date-field" allowClear format="DD.MM.YYYY" />
          </Form.Item>
          <Form.Item
            name="time"
            noStyle
            rules={[{ required: true, message: 'Выберите время' }]}
            style={{ marginBottom: '8px' }}
          >
            <StyledTimePicker className="time-field" allowClear format="HH:mm" />
          </Form.Item>
        </DateTimeWrapper>
      </Form.Item>

      <Form.Item style={{ textAlign: 'center', marginTop: 16, marginBottom: '8px' }}>
        <ZewaButton style={{ margin: 'auto' }} variant="blue-b" type="submit">
          Отправить
        </ZewaButton>
      </Form.Item>
    </Form>
  );
}
