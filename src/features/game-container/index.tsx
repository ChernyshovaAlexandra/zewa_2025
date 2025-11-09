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
} from '../checks/check-container/style';
import { Icon20InfoCircleOutline } from '@vkontakte/icons';
import { Spacing } from '@vkontakte/vkui';
import styled from 'styled-components';
import { Text } from '@/shared/ui';

type GameProps = {
  header: string;
  caption: string;
  status: string;
  points_earned: number;
  coins_earned: number;
};

const GameContainer: React.FC<GameProps> = ({
  header,
  caption,
  status,
  points_earned,
  coins_earned,
}) => {
  if (status === 'started') return null;
  return (
    <CheckData>
      <FlexBetween>
        <CheckNumber>{header}</CheckNumber>
        {status === 'started' ? (
          <Total style={{ fontSize: '11px' }}>не завершена</Total>
        ) : (
          <StyledIconButton style={{ opacity: 0, cursor: 'default' }}>
            <Icon20InfoCircleOutline color="#7E97B4" />
          </StyledIconButton>
        )}
      </FlexBetween>
      <FlexBetween>
        <Date>{caption}</Date>
      </FlexBetween>
      <Spacing size={24}>
        <SeparatorStyled />
      </Spacing>
      <StyledFlex>
        <Total>Собрано</Total>
        <ResultContainer>
          {coins_earned ? (
            <StyledCoins>
              <Text style={{ fontSize: '14px' }}> +{coins_earned} </Text>
              <img
                src={`/assets/images/coins-icon.png`}
                width="24"
                alt="coins-icon"
                loading="lazy"
              />
            </StyledCoins>
          ) : null}
          {points_earned ? (
            <StyledCoins>
              <Text style={{ fontSize: '14px' }}> +{points_earned} </Text>
              <img src="/assets/images/backpack-icon.png" alt="иконка рюкзак" />
            </StyledCoins>
          ) : null}
        </ResultContainer>
      </StyledFlex>
    </CheckData>
  );
};
const StyledFlex = styled(FlexBetween)`
  align-items: flex-start;
`;

const ResultContainer = styled.div`
  display: grid;
  place-items: center;
  gap: 10px;
  grid-template-columns: auto auto;

  img {
    height: 1.3rem;
    width: 1.3rem;
    object-fit: contain;
    object-position: bottom;
  }
  p {
    letter-spacing: -1px !important;
  }
`;

export default React.memo(GameContainer);
