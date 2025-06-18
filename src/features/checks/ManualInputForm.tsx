import { Form, Input, DatePicker, TimePicker } from 'antd';
import styled from 'styled-components';
import { ZewaButton, Text } from '@/shared/ui';

const StyledInput = styled(Input)`
  background: #fff;
  border: 1px solid #2d59df;
  border-radius: 4px;
`;

const StyledDatePicker = styled(DatePicker)`
  background: #fff;
  border: 1px solid #2d59df;
  border-radius: 4px;
  width: 100%;
`;

const StyledTimePicker = styled(TimePicker)`
  background: #fff;
  border: 1px solid #2d59df;
  border-radius: 4px;
  width: 100%;
`;

export function ManualInputForm() {
  const [form] = Form.useForm();

  const handleSubmit = (values: unknown) => {
    console.log(values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Text size="p4" align="center" style={{ marginBottom: 12 }}>
        Введите код из чека в нужное поле.
      </Text>
      <Form.Item label="ФН" name="fn" rules={[{ required: true, message: 'Введите ФН' }]}> 
        <StyledInput allowClear />
      </Form.Item>
      <Form.Item label="ФД" name="fd" rules={[{ required: true, message: 'Введите ФД' }]}> 
        <StyledInput allowClear />
      </Form.Item>
      <Form.Item label="ФП" name="fp" rules={[{ required: true, message: 'Введите ФП' }]}> 
        <StyledInput allowClear />
      </Form.Item>
      <Form.Item
        label="Сумма"
        name="sum"
        rules={[
          { required: true, message: 'Введите сумму' },
          { pattern: /^\d+(\.\d{2})?$/, message: 'Формат: руб.коп (00.00)' },
        ]}
      >
        <StyledInput allowClear placeholder="0.00" />
      </Form.Item>
      <Form.Item label="Дата" name="date" rules={[{ required: true, message: 'Выберите дату' }]}> 
        <StyledDatePicker allowClear format="DD.MM.YYYY" />
      </Form.Item>
      <Form.Item label="Время" name="time" rules={[{ required: true, message: 'Выберите время' }]}> 
        <StyledTimePicker allowClear format="HH:mm" />
      </Form.Item>
      <Form.Item>
        <ZewaButton variant="blue-b" htmlType="submit">
          Отправить
        </ZewaButton>
      </Form.Item>
    </Form>
  );
}
