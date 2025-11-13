import styled from 'styled-components';
import { Card, EllipsisText, HorizontalScroll } from '@vkontakte/vkui';
import { ButtonProps, ButtonStyles } from '@/components';
import { Text, ZewaButton } from '@/shared/ui';

export const ContentWithDomovenok = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  bottom: ${({ $isOpen }) => ($isOpen ? '-40px' : '-15px')};
  left: ${({ $isOpen }) => ($isOpen ? '-45px' : '-30px')};
  width: ${({ $isOpen }) => ($isOpen ? '230px' : '198px')};
  height: ${({ $isOpen }) => ($isOpen ? '170px' : '142px')};
  touch-action: none;
  z-index: 200;

  pointer-events: none;
  transition:
    bottom 0.25s ease,
    width 0.25s ease,
    height 0.25s ease,
    left 0.25s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const RollingLine = styled.div<{ $isOpen: boolean }>`
  @media screen and (min-width: 405px) {
    display: block;
  }
  position: fixed;
  bottom: 1.5rem;
  left: 0;
  width: 100%;
  background: #3c68ee30;
  height: 2.5rem;
`;

export const DomovenokInitial = styled.picture<{ $isOpen: boolean }>`
  display: none;

  @media screen and (min-width: 405px) {
    display: block !important;
    width: 10rem;
    height: 9.2rem;
  }
  position: absolute;
  left: 0;
  bottom: 0;
  opacity: ${({ $isOpen }) => ($isOpen ? 0 : 1)};
  transition: opacity 0.3s ease-in-out;
  z-index: 200;
`;

export const DomovenokOpened = styled.picture<{ $isOpen: boolean }>`
  z-index: 200;
  img {
    object-position: bottom;
    width: 11rem;
    height: 8.4rem;
    object-fit: contain;
  }
  position: absolute;
  left: 0;
  bottom: 0;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

export const DrawerWrapper = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  bottom: 0;
  height: ${({ $isOpen }) => ($isOpen ? '290px' : `4rem`)};
  width: 100%;
  background: url('/assets/images/scale/bg.webp') no-repeat center;
  background-size: cover;
  border-radius: 20px 20px 0 0;
  border: 1px solid #ebf9ff;
  z-index: 200;

  > p {
    position: relative;
  }

  @media screen and (max-height: 570px) {
    bottom: ${({ $isOpen }) => ($isOpen ? '1.9rem' : '0')};
    height: ${({ $isOpen }) => ($isOpen ? '40%' : `5rem`)};
  }

  &:after {
    content: '';
    position: absolute;
    display: block;
    background: url('/assets/images/arr-down.svg') no-repeat center;
    background-size: contain;
    top: -1rem;
    left: 0;
    right: 0;
    margin: auto;
    transform: ${({ $isOpen }) => ($isOpen ? `rotate(0deg)` : `rotate(-180deg)`)};
    width: 0.9rem;
    height: 0.9rem;
    z-index: 10;
  }

  &:before {
    content: '';
    position: absolute;
    display: block;
    width: 39px;
    height: 39px;
    background: #e53375;
    top: -1.3rem;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 100%;
    border: 1px solid #ebf9ff;
    clip-path: polygon(0 54%, 100% 54%, 100% 0, 0 0);
    z-index: 5;
  }
`;

export const DrawerHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0 0;
  cursor: pointer;
`;

export const DrawerContent = styled.div<{ $isOpen: boolean }>`
  min-height: 14rem;
`;

export const ArrowIcon = styled.div<{ $isOpen: boolean }>`
  width: 8rem;
  height: 4.2rem;
  background-size: 100% 105%;
  position: absolute;
  top: -3.5rem;
  background-position: 100% 0;
`;

export const Bubble = styled.div<{ $activated: boolean; $isOpen: boolean }>`
  position: relative;
  flex-shrink: 0;
  text-align: center;
  display: flex;
  gap: 14px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: transform 0.5s ease-in-out;
  user-select: none;
  width: 170px;
  height: 140px;
  padding: 5px;
  border-radius: 14px;
  background: ${({ $activated }) =>
    $activated ? 'radial-gradient(50% 50% at 50% 50%, #eb65a7 0%, #e53375 100%), #e53375' : '#fff'};
  backdrop-filter: blur(4px);

  video {
    pointer-events: none;
  }
`;

export const Zewa = styled.span<{ $isOpen: boolean; $isActivated: boolean }>`
  position: relative;
  width: fit-content;
  display: grid;
  place-items: center;
  margin: auto;
  color: white;
  font-family: 'Foco Trial';
  font-weight: 900;
  font-size: 12px;
  color: ${({ $isActivated }) => ($isActivated ? '#f994b9' : '#FAFBFF')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  bottom: -38px;
  z-index: 20;

  &::after {
    content: '';
    position: absolute;
    right: -75px;
    height: 8px;
    width: 2px;
    background: #f994b9;
    bottom: 4px;
  }
`;

export const StyledCard = styled(Card)`
  padding-bottom: 1.4rem;
  background: transparent;
`;

export const StyledSpan = styled(EllipsisText)`
  position: relative;
  z-index: 16;
  text-align: center;

  color: #ffffff;
  font-family: 'Foco Trial';
  font-weight: 700;
  font-size: 16px;
  line-height: 120%;
  letter-spacing: 0;

  -webkit-text-stroke-width: 3px;
  -webkit-text-stroke-color: #003980;

  paint-order: stroke fill;
  text-rendering: geometricPrecision;

  text-shadow:
    0 0 0 #003980,
    0.5px 0.5px 0 #003980,
    -0.5px -0.5px 0 #003980;
`;

export const StyledSpanPink = styled.span`
  color: #e22c6e;
  position: absolute;
  border-radius: 4px;
  background: #fff;
  display: flex;
  padding: 2px 6px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  top: -6px;

  > span {
    color: #e53375;
    text-align: center;
    font-feature-settings:
      'liga' off,
      'clig' off;
    font-family: 'Foco Trial';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%; /* 12px */
  }
`;

export const PrizeImg = styled.img`
  position: relative;
  z-index: 2;
  width: 55px;
  height: 55px;
  object-fit: contain;
  object-position: center;
  margin-top: 0.5rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }
`;

export const StyledNotification = styled.span`
  position: relative;
  z-index: 11;
  color: rgb(226, 44, 110);
  display: block;
`;

export const ButtonComponentStyled = styled.div`
  position: relative;
  z-index: 11;
  font-size: 1rem;
  padding: 7px 15px;
  text-transform: capitalize;
  margin-top: 8px;
`;

export const ScrollContainer = styled(HorizontalScroll)`
  width: 100%;
  position: relative;
  margin-top: -15px;
  z-index: 100;

  .vkuiHorizontalScroll__in {
    overflow-y: visible;
    padding-top: 15px;
  }
  > div > div > div {
    &:first-child {
      display: flex;
    }
  }
  @media screen and (max-height: 567px) {
    bottom: -0.5rem;
  }
`;

export const StyledCell = styled.div<{
  $isEmpty: boolean;
  $isOpen: boolean;
  $isActivated: boolean;
  $showPaper: boolean;
  $isFirstEmpty: boolean;
}>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  visibility: ${({ $isEmpty }) => ($isEmpty ? 'hidden' : 'visible')};
  opacity: ${({ $isEmpty }) => ($isEmpty ? '0' : '1')};
  position: relative;
  padding: 0;
  padding: 0 5px 20px;
  height: fit-content;
  flex-shrink: 0;
  border-bottom: 20px solid #b0d3e9;

  &::before {
    content: '';
    position: absolute;
    visibility: ${({ $isActivated }) => ($isActivated ? 'visible' : 'hidden')};
    height: 20px;
    bottom: -20px;
    background: var(--main-pink);
    background-size: 170px 50px;
    width: 120%;
    display: block;
    left: -45%;
    border: 0;
    z-index: 1;
  }

  &::after {
    content: '';
    left: ${({ $isFirstEmpty }) => ($isFirstEmpty ? '-20%' : ' 65%')};
    visibility: ${({ $showPaper }) => ($showPaper ? 'visible' : 'hidden')};
    position: absolute;
    background: url('/assets/images/snowflake-after.webp') no-repeat center;
    background-size: contain;
    width: 32px;
    height: 31.354px;
    bottom: 14px;
  }
`;

export const ScaleTitle = styled(Text)`
  color: #ffffff;
  text-align: center;
  font-family: 'Foco Trial';
  font-weight: 900;
  font-style: normal;
  line-height: 110%;
  font-size: clamp(1.4rem, 1.6vw + 0.8rem, 1.6rem);

  /* Контур и объём */
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #193f74;
  paint-order: stroke fill;
  text-shadow:
    0 1px 0 rgba(18, 53, 171, 0.5),
    0 0.5px 1px rgba(0, 0, 0, 0.2);

  font-feature-settings:
    'liga' off,
    'clig' off;
  margin-top: 0.5rem;

  /* защита от схлопывания шрифта на Android */
  text-rendering: geometricPrecision;
  -webkit-font-smoothing: antialiased;
`;

export const SpanDraw = styled.span`
  color: var(---main-pink, #e22c6e);
  text-align: center;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-family: 'Foco Trial';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;

export const Button = styled.button<ButtonProps>`
  ${ButtonStyles};
  padding: 7px 15px !important;
  font-size: 1rem !important;
  margin: 0.3rem 0;
  border: ${({ variant }) => (variant === 'accent' ? '3px solid #F23177' : '1px solid #ACD2FF')};
  border-radius: 10px;
  background-color: ${({ variant }) => (variant === 'accent' ? '' : '#D3E8FA')};
  color: ${({ variant }) => (variant === 'accent' ? '' : '#2688EB')};
  text-transform: none;
  font-weight: 400;
  text-shadow: none;

  &:disabled {
    filter: drop-shadow(0px 3px 0px #d4d7dc);
    color: #2688eb;
    background: #d3e8fa;
    box-shadow: 0px 2px 0px 0.5px #81bbf9;

    &:hover {
      background: #d3e8fa;
    }
  }
  @media screen and (min-width: 505px) {
    padding: 0.7rem 1.3rem !important;
  }
`;
export const ButtonScale = styled(ZewaButton)`
  color: var(---, #193f74);
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-family: 'Foco Trial';
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  text-transform: uppercase;
  padding: 0 16px;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: var(--10, 10px);
  background: linear-gradient(180deg, #f4fcff 0%, #e3f7ff 100%);
  box-shadow:
    0 -1px 2px 0 #b3c7e9 inset,
    0 2px 0 0 #b3c7e9;
  height: 38px;
`;
