import React from 'react';
import {
  CheckData,
  FlexBetween,
  CheckNumber,
  StyledIconButton,
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

export type CheckProps = {
  subtitle: string;
  caption: string;
  coins_earned: number;
  status: string;
};

const CheckContainer: React.FC<CheckProps> = ({ subtitle, caption, coins_earned, status }) => {
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
        />
      ),
    });
  };

  return (
    <CheckData>
      <FlexBetween>
        <CheckNumber>{subtitle}</CheckNumber>
        <StyledIconButton onClick={showModalInfo}>
          <Icon20InfoCircleOutline color="#7E97B4" />
        </StyledIconButton>
      </FlexBetween>
      <FlexBetween>{caption ? <Date> {Helper.formatDate(caption)}</Date> : <></>}</FlexBetween>
      <Spacing size={24}>
        <SeparatorStyled />
      </Spacing>
      <FlexBetween>
        <Total>Статус</Total>
        {status === 'Засчитан' || coins_earned ? (
          <StyledCoins>
            <p>+{coins_earned}</p>
            <img src={'/images/coin-icon.png'} width="17.8" alt="coin icon" />
          </StyledCoins>
        ) : (
          <Total>{status}</Total>
        )}
      </FlexBetween>
    </CheckData>
  );
};

export default React.memo(CheckContainer);

// <CheckContainer
// key={id}
// subtitle={`Чек №${id + 1}`}
// caption={item.date_time_raw}
// coins_earned={item.coins_earned}
// status={item.status}
// />
