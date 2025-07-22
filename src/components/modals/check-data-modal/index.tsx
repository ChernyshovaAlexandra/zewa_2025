import { ModalHeading } from '@/components/UI/heading';
import { CheckProps } from '@/features/checks/check-container';
import Helper from '@/helpers/Helper';
import { Text } from '@/shared/ui';
import React from 'react';

const CheckDataModal: React.FC<CheckProps> = ({ subtitle, caption, coins_earned, status }) => {
  return (
    <>
      <ModalHeading level={2}>{subtitle}</ModalHeading>
      {!coins_earned && (
        <>
          <Text>
            {status === 'Ждёт проверки'
              ? status
              : `Загружен ${caption ? Helper.formatDate(caption) : 'и ждёт проверки.'}`}
          </Text>
          <br />
        </>
      )}

      {status === 'Засчитан' ? (
        <Text>
          В вашем чеке есть товар бренда Zewa, и вы получили в награду {coins_earned}{' '}
          {Helper.getCoinsForm(coins_earned)}.
          <br />
          <br />
          <b>Удачи в игре!</b>
        </Text>
      ) : coins_earned ? (
        <Text>
          Вы получили в награду {coins_earned} {Helper.getCoinsForm(coins_earned)}.
          <br />
          <br />
          <b>Удачи в игре!</b>
        </Text>
      ) : (
        <></>
      )}
    </>
  );
};

export default React.memo(CheckDataModal);
