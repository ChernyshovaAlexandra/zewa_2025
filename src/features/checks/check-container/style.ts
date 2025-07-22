import { IconButton } from '@vkontakte/vkui';
import styled from 'styled-components';

export const CheckData = styled.div`
  padding: 12px;
  background: #fff;
  border-radius: 0.8rem;
  margin-bottom: 0.5rem;
`;

export const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CheckNumber = styled.span`
  color: #1235ab;
  font-feature-settings:
    'liga' off,
    'clig' off;

  /* P3 Black */
  font-family: 'Foco Trial';
  font-size: 0.95rem;
  font-style: normal;
  font-weight: 900;
  line-height: 130%;
`;

export const StyledIconButton = styled(IconButton)`
  border-radius: 50%;
  height: fit-content;
  padding: 0.5rem;
  &:hover {
    background: #ececec;
  }
`;

export const Date = styled.span`
  color: #596471;
  font-feature-settings:
    'liga' off,
    'clig' off;

  margin-top: 5px;
  font-family: 'Foco Trial';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

export const Total = styled.span`
  font-family: 'Foco Trial';
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  text-align: left;
  color: #7e97b4;
`;

export const SeparatorStyled = styled.div`
  width: 100%;
  height: 2px;
  background: transparent;
  position: relative;
  margin: 5px 0;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, #818c9940 50%, #fff 51%);
    background-size: 12px;
    transform: translateY(-50%);
  }
`;

export const StyledCoins = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;

  p {
    color: #1235ab;
    text-align: right;
    font-feature-settings:
      'liga' off,
      'clig' off;

    font-family: 'Foco Trial';
    font-size: 0.95rem;
    font-style: normal;
    font-weight: 900;
    line-height: 130%;
    margin: 0;
  }

  img {
    flex-shrink: 0;
  }
`;
