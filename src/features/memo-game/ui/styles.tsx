import { Heading, Text } from '@/shared/ui';
import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(3px);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #fff;
  position: relative;
  overflow: hidden;
  height: 100vh;
  padding: 10px;
  padding-top: calc(
    10px + var(--twa-safe-area-top, 0px) + (min(var(--twa-safe-area-top, 0px), 1px) * 30)
  );
  padding-bottom: calc(
    var(--twa-safe-area-bottom, 0px) + (min(var(--twa-safe-area-bottom, 0px), 1px) * 30)
  );
  --intro-ease: cubic-bezier(0.33, 1, 0.68, 1);
`;

export const IntroItem = styled.div<{ $introReady: boolean }>`
  width: 100%;
  display: block;
  transform-origin: center;
  opacity: ${({ $introReady }) => ($introReady ? 1 : 0)};
  transform: ${({ $introReady }) =>
    $introReady ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 8px, 0) scale(0.95)'};
  transition:
    opacity 500ms var(--intro-ease),
    transform 500ms var(--intro-ease);
  transition-delay: var(--intro-delay, 0ms);
  will-change: opacity, transform;
`;

export const ContentInner = styled.div`
  flex: 1;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 5px;
`;

export const TopRow = styled.div`
  display: flex;
  /* flex-direction: column; */
  gap: 16px;
  align-items: center;
  padding-bottom: 40px;
`;

export const CardsPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 54px);
  gap: 6px;
`;

export const CardPreview = styled.div<{ $highlight?: boolean }>`
  width: 54px;
  height: 70px;
  border-radius: 14px;
  background: ${({ $highlight }) =>
    $highlight
      ? 'linear-gradient(180deg, #ffe6f4 0%, #ff5fc5 100%)'
      : 'linear-gradient(180deg, #ffe39d 0%, #f3a636 100%)'};
  box-shadow: ${({ $highlight }) =>
    $highlight ? '0 8px 20px rgba(255, 104, 180, 0.4)' : '0 6px 12px rgba(192, 132, 13, 0.3)'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardLogo = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #fff;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 7px;
    border-radius: 50%;
    background: #0075c9;
  }
`;

export const CardBell = styled.div`
  position: relative;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    width: 20px;
    height: 24px;
    background: #ffd13b;
    border-radius: 10px 10px 4px 4px;
    position: relative;
    box-shadow: inset 0 -4px 0 rgba(0, 0, 0, 0.15);
  }

  span::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 18px;
    height: 6px;
    background: #ff4db8;
    border-radius: 50%;
  }
`;

export const HintText = styled(Text).attrs({
  size: 'p4',
})`
  color: #fff;
  text-align: center;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-family: 'Foco Trial';
  font-size: 15px;
  font-style: normal;
  font-weight: 900;
  line-height: 110%; /* 18.7px */

  strong {
    color: #ffe07a;
    font-weight: 800;
  }
`;

export const ArrowWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 80px;
`;

export const ArrowSvg = styled(({ style, ...rest }) => (
  <svg
    {...rest}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 44 43"
    width="44"
    height="43"
    fill="none"
  >
    <path
      d="M24.0198 20.945C18.8734 21.6321 14.0257 23.759 10.0354 27.081C5.61949 30.9008 2.55746 36.0465 1.30653 41.7497C1.28409 41.8455 1.22908 41.9305 1.1509 41.9901C1.07273 42.0498 0.976253 42.0805 0.877972 42.0769C0.779692 42.0733 0.685715 42.0356 0.612116 41.9704C0.538518 41.9052 0.48987 41.8164 0.474494 41.7193C-0.223644 37.4903 -0.150857 33.1699 0.689338 28.9669C1.22918 26.3044 3.56668 15.4122 13.7159 9.37472C17.4737 7.13878 21.5784 7.24035 24.1073 7.06378C24.2168 7.05507 24.319 7.00501 24.393 6.92376C24.467 6.84251 24.5073 6.73616 24.5057 6.62628L24.512 0.431753C24.5027 0.354407 24.5171 0.276073 24.5532 0.207049C24.5893 0.138025 24.6455 0.0815425 24.7143 0.0450258C24.7831 0.0085092 24.8613 -0.00633289 24.9387 0.00245321C25.0161 0.0112393 25.0891 0.0432431 25.1479 0.0942533L43.5753 13.6794C43.6304 13.7202 43.6751 13.7734 43.706 13.8347C43.7368 13.8959 43.7529 13.9636 43.7529 14.0321C43.7529 14.1007 43.7368 14.1684 43.706 14.2296C43.6751 14.2909 43.6304 14.344 43.5753 14.3849L25.2018 27.9685C25.1367 28.0162 25.0596 28.045 24.979 28.0516C24.8985 28.0582 24.8177 28.0424 24.7457 28.0059C24.6736 27.9694 24.613 27.9137 24.5707 27.8449C24.5283 27.7761 24.5058 27.6969 24.5057 27.6161V21.3818C24.5062 21.3199 24.4936 21.2587 24.4687 21.2022C24.4438 21.1456 24.4072 21.095 24.3612 21.0536C24.3153 21.0123 24.2611 20.9811 24.2023 20.9623C24.1434 20.9434 24.0812 20.9381 24.0198 20.945Z"
      fill="#F4FCFF"
    />
  </svg>
))``;

export const TimerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
  gap: 12px;
  text-align: center;
  width: 205px;
`;

export const TimerBubble = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0px 10px;
  border-radius: 10px;
  background: #e0f0ff;
  color: #0a2b6b;
  font-size: 20px;
  font-weight: 700;
  box-shadow:
    0 1px 2px 0 rgba(255, 255, 255, 0.6) inset,
    0 -2px 3px 0 #b3c7e9 inset,
    0 3px 0 0 #b3c7e9,
    0 5px 5px 0 rgba(0, 53, 116, 0.5);
  width: fit-content;
  height: 50px;
`;

export const TimerValue = styled.span`
  font-family: 'Foco Trial';
  font-size: 24px;
`;

export const PhoneSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  max-width: 252px;
  margin-top: -120px;
`;

export const PhoneMock = styled.div`
  width: 120px;
  height: 220px;
  border-radius: 32px;
  padding: 8px;
  background: linear-gradient(180deg, #f1f4ff 0%, #cfd8ff 100%);
  border: 3px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 12px 30px rgba(12, 26, 94, 0.35);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    width: 38px;
    height: 5px;
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.2);
  }
`;

export const PhoneScreen = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 26px;
  background: linear-gradient(180deg, #0b2a6b 0%, #07112f 100%);
  padding: 16px 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

export const PhoneCardRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

export const PhoneCard = styled.div<{ $active?: boolean }>`
  width: 22px;
  height: 28px;
  border-radius: 6px;
  background: ${({ $active }) =>
    $active ? 'linear-gradient(180deg, #ffe6f4 0%, #ff5fc5 100%)' : 'rgba(255, 255, 255, 0.2)'};
  box-shadow: ${({ $active }) => ($active ? '0 4px 8px rgba(255, 104, 180, 0.35)' : 'none')};
`;

export const PhoneBadge = styled.div`
  margin-top: auto;
  align-self: center;
  padding: 6px 14px;
  border-radius: 20px;
  background: #fff;
  color: #0a2b6b;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const ClubHint = styled(Heading).attrs({ size: 'h4' })`
  text-align: center;
  color: #faecc1;
  line-height: 1.3;
  font-size: 17px;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 0;
  width: 100%;
  display: block;
`;

export const Mascot = styled.img`
  width: 77%;
  max-width: 210px;
  align-self: center;
  margin: 0 auto;
  justify-self: flex-end;
  display: none;
  
  @media screen and (min-height: 700px) {
    display: block;
  }
`;

export const ControlRow = styled.div`
  display: flex;
  justify-content: center;
`;
