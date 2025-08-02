import React from 'react';
import {
  CheckData,
  FlexBetween,
  CheckNumber,
  Date,
  SeparatorStyled,
  Total,
  StyledCoins,
} from './style';
import { Icon20InfoCircleOutline } from '@vkontakte/icons';
import { Spacing } from '@vkontakte/vkui';
import Helper from '@/helpers/Helper';

import CheckDataModal from '@/components/modals/check-data-modal';
import { useModalStore } from '@/shared/model';
import { Text } from '@/shared/ui';

export type CheckProps = {
  subtitle: string;
  caption: string;
  coins_earned: number;
  status: string;
  check: { created_at: string };
};

const CheckContainer: React.FC<CheckProps> = ({
  subtitle,
  caption,
  coins_earned,
  status,
  check,
}) => {
  const { openModal } = useModalStore.getState();

  const showModalInfo = () => {
    openModal({
      title: subtitle,
      content: (
        <CheckDataModal
          subtitle={subtitle}
          caption={caption}
          coins_earned={coins_earned}
          status={status}
          check={check}
        />
      ),
    });
  };

  return (
    <CheckData>
      <FlexBetween>
        <CheckNumber>{subtitle}</CheckNumber>
        <Icon20InfoCircleOutline color="#7E97B4" onClick={showModalInfo} />
      </FlexBetween>
      <FlexBetween>{caption ? <Date> {Helper.formatDate(caption)}</Date> : <></>}</FlexBetween>
      <Spacing size={24}>
        <SeparatorStyled />
      </Spacing>
      <FlexBetween>
        <Total>Статус</Total>
        {status === 'Засчитан' || coins_earned ? (
          <StyledCoins>
            <Text style={{ fontSize: '14px' }}> +{coins_earned} </Text>
            <img
              src={`/assets/images/coins-icon.png`}
              width="24"
              alt="coins-icon"
              loading="lazy"
            />
          </StyledCoins>
        ) : status.indexOf('Откло') !== -1 ? (
          <Total>Отклонён</Total>
        ) : (
          <Total>{status}</Total>
        )}
      </FlexBetween>
    </CheckData>
  );
};

export default React.memo(CheckContainer);
