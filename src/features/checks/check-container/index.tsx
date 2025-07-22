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
              src={`/public/assets/images/coins-icon.png`}
              width="24"
              alt="coins-icon"
              loading="lazy"
            />
          </StyledCoins>
        ) : (
          <Total>{status}</Total>
        )}
      </FlexBetween>
    </CheckData>
  );
};

export default React.memo(CheckContainer);
