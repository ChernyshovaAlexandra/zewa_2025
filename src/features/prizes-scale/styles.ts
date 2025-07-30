import styled from 'styled-components';
import { Card, EllipsisText, HorizontalScroll } from '@vkontakte/vkui';
import { ButtonProps, ButtonStyles } from '@/components';

export const ContentWithDomovenok = styled.div`
  position: absolute;
  bottom: -55px;
  left: 0;
  width: 184px;
  height: 179px;
  touch-action: none;
  z-index: 200;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PaperRoll = styled.div`
  width: 4.5rem;
  height: 5rem;
  background: url(/assets/images/toilet-paper.png) no-repeat center;
  position: absolute;
  right: -20px;
  background-size: contain;
  bottom: -3px;
  z-index: 2;
  transition: all 4s ease-in-out;
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
  height: ${({ $isOpen }) => ($isOpen ? '40%' : `4rem`)};
  width: 100%;
  background: ${({ $isOpen }) =>
    $isOpen
      ? `#f4fcff linear-gradient(
      180deg,
      rgba(244, 252, 255, 0) 60%,
      rgba(244, 252, 255, 0) 65%,
      #cfd9eb 85%,
      #cfd9eb 100%
    )`
      : `#f4fcff`};
  border-radius: 20px 20px 0 0;
  z-index: 200;

  @media screen and (max-height: 570px) {
    bottom: ${({ $isOpen }) => ($isOpen ? '1.9rem' : '0')};
    height: ${({ $isOpen }) => ($isOpen ? '40%' : `5rem`)};
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
  display: grid;
  place-items: center;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: transform 0.5s ease-in-out;
  padding-bottom: 12px;
  user-select: none;
  height: 110px;
  margin-bottom: 20px;
  padding-top: 10px;

  width: 155px;
  padding: 5px;
  border-radius: var(--14, 14px);
  background: ${({ $activated }) =>
    $activated ? 'linear-gradient(180deg, #2D59DF 0%, #0F3BC1 100%)' : '#fff'};
  border: ${({ $activated }) => ($activated ? '' : '1px dashed #1235ab')};
  filter: ${({ $activated }) => ($activated ? 'drop-shadow(0px 5px 0px #1235ab)' : '')};

  span {
    font-family: 'Foco Trial';
    font-size: 15px;
    font-weight: 400;
    line-height: 18px;
    text-align: center;
    color: ${({ $activated }) => ($activated ? '#fff' : '#1235ab')};
  }
  video {
    pointer-events: none;
  }
  @media screen and (min-width: 560px) {
    width: 165px;
    height: 115px;
    margin-bottom: 20px;
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
  color: ${({ $isActivated }) => ($isActivated ? '#f994b9' : '#3054c1')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};

  &::after {
    content: '';
    position: absolute;
    left: 24px;
    right: 0;
    height: 40px;
    width: 2px;
    background: repeating-linear-gradient(
      to bottom,
      #1d3ea3 0%,
      #1d3ea3 10%,
      /* Высота штриха */ transparent 10%,
      transparent 15% /* Прозрачный зазор */
    );
    transform: skewX(32deg);
    top: 28px;
    z-index: 100;
  }
`;

export const StyledCard = styled(Card)`
  padding-bottom: 1.4rem;
  background: transparent;
`;

export const StyledSpan = styled(EllipsisText)`
  position: relative;
  z-index: 16;
  font-weight: bold;
  color: #fff;
`;

export const StyledSpanPink = styled(StyledSpan)`
  color: #e22c6e;
  position: absolute;

  padding: 2px 5px;
  top: -2px;
  left: 5px;
  > span {
    font-size: 10px;
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
  /* bottom: -2.5rem; */
  z-index: 100;

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
  padding: 0 5px 10px;
  height: fit-content;
  flex-shrink: 0;
  border-bottom: 40px solid #3054c1;

  &::after {
    content: '';
    position: absolute;
    width: 65px;
    height: 65px;
    visibility: ${({ $showPaper, $isFirstEmpty }) =>
      $showPaper || $isFirstEmpty ? 'visible' : 'hidden'};
    background: url(/assets/images/toilet-paper.png) no-repeat center;
    left: ${({ $isFirstEmpty }) => ($isFirstEmpty ? '-20%' : ' 60%')};
    z-index: 100;
    background-size: contain;
    bottom: -40px;
  }

  &::before {
    content: '';
    position: absolute;
    visibility: ${({ $isActivated }) => ($isActivated ? 'visible' : 'hidden')};
    height: 40px;
    bottom: -40px;
    background: url(/assets/images/paper-pattern.jpg) repeat-x;
    background-size: 170px 50px;
    width: 120%;
    display: block;
    left: -45%;
    border: 0;
    z-index: 10;
    transform: skewX(32deg);
  }
`;

export const SpanDraw = styled.span`
  color: #7186cd;
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
