import { Text, ZewaButton } from '@/shared/ui';
import styled from 'styled-components';

export const LevelsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  max-width: 460px;
  padding: 0 1rem 2rem;
  box-sizing: border-box;
`;

export const LevelCard = styled.div<{ $locked: boolean }>`
  position: relative;
  width: 100%;
  max-width: 330px;
  border-radius: 20px;
  border-radius: 20px;
  background:
    linear-gradient(0deg, #f4fcff 0%, #f4fcff 100%),
    radial-gradient(50% 50% at 50% 50%, #061e66 0%, #23497e 100%);
  padding: 10px;
`;

export const LevelHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;

  h2 {
    color: var(---, #193f74);
    font-feature-settings:
      'liga' off,
      'clig' off;
    font-family: 'Foco Trial';
    font-size: 30px;
    font-style: normal;
    font-weight: 900;
    line-height: 110%;
    text-transform: uppercase;
  }
`;

export const LevelInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h3 {
    color: #1e2a46;
    font-size: 1.25rem;
    font-weight: 900;
    text-transform: uppercase;
    margin: 0;
    -webkit-text-stroke: 1px #193f74;
    color: #ffffff;
    text-shadow: 0 1px 0 rgba(25, 63, 116, 0.4);
  }

  p {
    font-size: 0.9rem;
    color: #596471;
    margin: 0;
  }

  span {
    font-size: 0.85rem;
    color: #8893a0;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
`;

export const BlueInfoBlock = styled.div`
  border-radius: 10px;
  background: #5fa2be;
  width: 142px;
  height: 53px;
  flex-shrink: 0;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;

  p,
  span {
    opacity: 0.9;
    color: #fff;
    font-family: 'Foco Trial';
    font-size: 18px;
    font-style: normal;
    font-weight: 900;
    line-height: 100%;
    margin: 0;
    padding: 0;
  }
`;

export const LevelDescription = styled(Text)`
  color: #052b60;
  text-align: center;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-family: 'Foco Trial';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

export const GameBtnWrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const GameBtn = styled(ZewaButton)<{ $isClosed?: boolean }>`
  border-radius: var(--10, 10px);
  background: ${({ $isClosed }) =>
    $isClosed ? 'linear-gradient(180deg, #E4E6EC 0%, #717684 100%)' : '#f23177'};
  box-shadow: ${({ $isClosed }) =>
    $isClosed
      ? `0 1px 2px 0 rgba(231, 235, 240, 0.4) inset,
    0 -2px 3px 0 #5d6270 inset,
    0 3px 0 0 #5d6270,
    0 5px 5px 0 rgba(0, 53, 116, 0.5)`
      : `0 3px 30px 0 rgba(241, 6, 109, 0.5),
    0 23px 44.5px 0 rgba(185, 18, 154, 0.5),
    0 1px 2px 0 rgba(231, 235, 240, 0.4) inset,
    0 -2px 8.2px 0 #ae2260 inset`};
  position: relative;
  width: 100%;
  height: 53px;

  cursor: ${({ $isClosed }) => ($isClosed ? 'not-allowed' : 'pointer')};

  &:hover {
    background: ${({ $isClosed }) =>
      $isClosed ? 'linear-gradient(180deg, #E4E6EC 0%, #717684 100%)' : '#f23177'};
    box-shadow: ${({ $isClosed }) =>
      $isClosed
        ? `0 1px 2px 0 rgba(231, 235, 240, 0.4) inset,
    0 -2px 3px 0 #5d6270 inset,
    0 3px 0 0 #5d6270,
    0 5px 5px 0 rgba(0, 53, 116, 0.5)`
        : `0 1px 2px 0 rgba(231, 235, 240, 0.4) inset,
      0 -2px 8.2px 0 #ae2260 inset`};
  }
`;

export const GameBtnImg = styled.img`
  position: absolute;
  width: 100%;
  right: -35px;
  top: -55px;
`;

export const CompletedRewardText = styled(Text)`
  color: rgba(5, 43, 96, 0.7);
  text-align: center;
  font-family: 'Foco Trial';
  font-size: 14px;
  line-height: 140%;
  margin-top: 8px;
`;
