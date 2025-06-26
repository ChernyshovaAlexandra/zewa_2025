import styled from 'styled-components';
import { Card, HorizontalScroll } from '@vkontakte/vkui';

export const ContentWithDomovenok = styled.div`
  position: fixed;
  bottom: -2px;
  left: 0;
  width: 100%;
  touch-action: none;
  z-index: 200;
`;

export const PaperUnrolled = styled.div<{ $width: string }>`
  width: ${(props) => props.$width};
  height: 100%;
  position: relative;
  transition: width 3s ease-in-out;
  background: url(/images/paper-pattern.jpg);
`;

export const PaperRoll = styled.div`
  width: 4rem;
  height: 4.4rem;
  background: url(/images/toilet-paper.png) no-repeat center;
  position: absolute;
  right: -1.5rem;
  background-size: contain;
  top: -2.25rem;

  &::after {
    content: '';
    position: absolute;
    width: 3.25rem;
    height: 3.25rem;
    background: url(/images/vtulka.png) no-repeat center;
    background-size: contain;
    top: 1rem;
    left: 0.8rem;
    transform-origin: center;
  }
`;

export const Gradient = styled.div<{ $isOpen: boolean }>`
  background: linear-gradient(180deg, rgba(31, 67, 171, 0) 36%, #1f43ab 42.73%, #1c3ea3 100%);
  width: 100%;
  height: 7.5rem;
  position: fixed;
  bottom: ${({ $isOpen }) => ($isOpen ? '0rem' : '4rem')};
  left: 0;
  display: none;

  @media screen and (min-width: 405px) {
    display: block;
  }
`;

export const RollingLine = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media screen and (min-width: 405px) {
    display: block;
  }
  position: fixed;
  bottom: 5.5rem;
  visibility: ${({ $isOpen }) => ($isOpen ? 'hidden' : 'visible')};
  left: 0;
  width: 100%;
  background: rgba(48, 84, 193, 1);
  height: 2rem;
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
  position: fixed;
  left: 0;
  width: 100%;
  background: linear-gradient(180deg, #233a7c 0%, #182d6a 100%);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.2);
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0%)' : 'translateY(calc(100% - 13.8rem))')};
  transition: transform 0.3s ease-in-out;
  bottom: 0;
  z-index: 101;

  @media screen and (max-width: 405px) {
    bottom: -9rem;
    height: ${({ $isOpen }) => ($isOpen ? '25rem' : '5rem')};
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

  @media screen and (max-width: 404px) {
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  }
`;

export const ArrowIcon = styled.div<{ $isOpen: boolean }>`
  width: 8rem;
  height: 4.2rem;
  background: ${({ $isOpen }) =>
    $isOpen
      ? 'url("/images/prizes-scale/btn-down.png?resize&size=360&format=webp") no-repeat center'
      : 'url("/images/prizes-scale/btn-up.png?resize&size=360&format=webp") no-repeat center'};
  background-size: 100% 105%;
  position: absolute;
  top: -3.5rem;
  background-position: 100% 0;
`;

export const Bubble = styled.div<{ $activated: boolean; $isOpen: boolean }>`
  position: relative;
  flex-shrink: 0;
  background: ${(props) => (props.$activated ? '#e5f6ff' : '#4D6EA7')};
  padding: 10px;
  border: 3px solid;
  border-color: ${(props) => (props.$activated ? '#F4FCFF' : '#668CC8')};
  color: ${(props) => (props.$activated ? 'rgb(38, 136, 235)' : '#F2F2F2')};
  border-radius: 15px;
  filter: drop-shadow(0px 5px 0px #4e6c8f);

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
  /* height: 80px; */

  &::before {
    content: '';
    position: absolute;
    bottom: -12px;
    width: 2rem;
    height: 2rem;
    border-radius: 7px;
    background: ${(props) => (props.$activated ? '#e5f6ff' : '#4D6EA7')};
    transform: rotate(45deg);
    left: 0;
    right: 0;
    margin: auto;
    border: 3px solid;
    border-color: ${(props) => (props.$activated ? '#F4FCFF' : '#668CC8')};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: ${(props) => (props.$activated ? '#e5f6ff' : '#4D6EA7')};
    width: 6rem;
    height: 4rem;
  }

  span {
    font-family: 'Foco Trial';
    font-size: 15px;
    font-weight: 400;
    line-height: 18px;
    text-align: center;
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

export const StyledSpan = styled.span`
  position: relative;
  z-index: 16;
  font-weight: bold;
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

export const PrizeImg = styled.picture`
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
  bottom: 0rem;

  > button {
    transform: translateY(-2.5rem);
    z-index: 30;
  }

  > div > div > div {
    &:first-child {
      display: flex;
    }
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
    background: url(/images/toilet-paper.png) no-repeat center;
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
    background: url(/images/paper-pattern.jpg);
    width: 120%;
    display: block;
    left: -45%;
    border: 0;
    z-index: 10;
    transform: skewX(32deg);
  }
`;

export const SpanDraw = styled.span``;
