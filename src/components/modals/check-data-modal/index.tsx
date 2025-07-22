import { CheckProps } from '@/features/checks/check-container';
import Helper from '@/helpers/Helper';
import { Text } from '@/shared/ui';
import React from 'react';

const CheckDataModal: React.FC<CheckProps> = ({ caption, coins_earned, status }) => {
  return (
    <>
      {!coins_earned && (
        <>
          <Text style={{ color: '#596471' }}>
            {status === 'Ждёт проверки'
              ? status
              : `Загружен ${caption ? Helper.formatDate(caption) : 'и ждёт проверки.'}`}
          </Text>
          <br />
        </>
      )}
      {coins_earned && caption ? (
        <Text style={{ color: '#596471', textAlign: 'center' }}>
          Загружен {Helper.formatDate(caption)}
        </Text>
      ) : (
        <></>
      )}
      {status === 'Засчитан' ? (
        <Text style={{ color: '#596471',margin: 0 }}>
          В вашем чеке есть товар бренда Zewa, и вам начислено {coins_earned}{' '}
          {Helper.getCoinsForm(coins_earned)}.
        </Text>
      ) : coins_earned ? (
        <Text style={{ color: '#596471', margin: 0 }}>
          Вам начислено {coins_earned} {Helper.getCoinsForm(coins_earned)}.
        </Text>
      ) : (
        <></>
      )}
    </>
  );
};

export default React.memo(CheckDataModal);
