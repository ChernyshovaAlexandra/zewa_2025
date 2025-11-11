import styled, { css, keyframes } from 'styled-components';

const timerPulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding-top: 12px;
`;

export const InfoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const infoBlockStyles = css`
  border-radius: var(--10, 10px);
  background: linear-gradient(180deg, #f4fcff 0%, #e3f7ff 100%);
  box-shadow:
    0px 1px 2px 0px rgba(255, 255, 255, 0.6) inset,
    0px -2px 3px 0px #b3c7e9 inset,
    0px 3px 0px 0px #b3c7e9,
    0px 5px 5px 0px rgba(0, 53, 116, 0.3);
  height: 50px;
  padding: 0 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--main-blue);
  font-family:
    'Foco Trial',
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  font-size: 19px;
  font-style: normal;
  font-weight: 900;
  line-height: 1.1;

  svg {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
  }
`;

export const InfoBlock = styled.div`
  ${infoBlockStyles};
  min-width: 0;
  text-align: center;
  white-space: nowrap;

  &[data-critical='true'] {
    background: linear-gradient(180deg, #ffe1ef 0%, #ffc1dd 100%);
    box-shadow:
      0px 1px 2px 0px rgba(255, 255, 255, 0.6) inset,
      0px -2px 3px 0px rgba(255, 100, 172, 0.4) inset,
      0px 3px 0px 0px rgba(255, 100, 172, 0.4),
      0px 5px 5px 0px rgba(255, 100, 172, 0.3);
  }
`;

export const PauseButton = styled.button`
  ${infoBlockStyles};
  width: 50px;
  min-width: 50px;
  padding: 0;
  border: none;
  cursor: pointer;
  justify-content: center;
  color: var(--main-blue);

  &:focus-visible {
    outline: 2px solid #5d79c1;
    outline-offset: 2px;
  }
`;

export const TimerValue = styled.span`
  color: #193f74;
  font-family: 'Foco Trial';
  font-size: 18px;
  font-style: normal;
  font-weight: 900;
  line-height: 100%;
  display: inline-block;
  transition: color 0.2s ease;

  &[data-critical='true'] {
    color: #ff2f92;
  }

  &[data-pulse='true'] {
    animation: ${timerPulse} 1s infinite;
  }
`;

export const SnowflakeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  text-align: center;
  color: var(--main-blue);
`;

export const SnowflakeCount = styled(TimerValue)``;
