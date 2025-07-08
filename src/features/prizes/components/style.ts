import { Card, Cell, Image, SimpleCell } from '@vkontakte/vkui';
import styled from 'styled-components';
import { Text } from '@/shared/ui';
import { ButtonProps, ButtonStyles } from '@/components';

export const StyledCard = styled(Card)`
  margin-top: 1rem;
  background: #e3f7ff;
  border: 5px solid #bee1fb;
  border-radius: 14px;
  box-shadow: inset 0px -2px 0px #9ab1c5;
  filter: drop-shadow(0px 5px 0px #6e8aa9);
  padding: 10px;
`;

export const HeadingStyled = styled(Text)`
  margin-bottom: 1.2rem;
`;

export const Description = styled.p`
  font-family: 'Foco Trial';
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  white-space: break-spaces;
  color: rgba(109, 120, 133, 1);
`;

export const Notification = styled(Description)`
  line-height: 1;
  font-size: 14px;
`;

export const PromoCodeContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #a9d5f7;
  background: #d4ecff;
  padding: 10px 15px;
  border-radius: 12px;
  width: 100%;
  font-family: 'Foco Trial';
  font-size: 19px;
  font-weight: 700;
  line-height: 20.9px;
  text-align: center;
  margin: 1rem 0;

  @media screen and (min-width: 505px) {
    width: fit-content;
    text-align: left;
  }
`;

export const PromoText = styled.span`
  font-size: 18px;
  color: #2761c6;
  font-weight: bold;
  margin-right: 10px;
  display: block;
  width: 100%;
`;

export const CopyButton = styled.button<ButtonProps>`
  ${ButtonStyles}

  margin: -1.1rem -.9rem -.7rem 0 !important;
  padding: 0.6rem !important;
`;

export const CellStyled = styled(SimpleCell)`
  padding: 0 7px;
  align-items: flex-start;
  p,
  h5,
  div {
    user-select: none;
  }
  > div:first-child {
    display: none;
    position: static;
    padding-top: 7px;

    @media screen and (min-width: 400px) {
      display: flex;
    }
  }
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

export const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: space-between;

  svg {
    @media screen and (max-width: 510px) {
      width: 100%;
      height: auto;
    }
  }

  @media screen and (min-width: 515px) {
    flex-direction: row;
  }
  > div:first-child {
    h5 {
      white-space: break-spaces;
    }
  }
`;

export const Expires = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: space-between;
  align-items: flex-end;

  flex-direction: column;

  @media screen and (min-width: 505px) {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    margin-top: 0;

    > div {
      &:first-child {
        max-width: 50%;
      }
    }
  }
`;

export const BarcodePrizeContainerBefore = styled.div`
  width: 100%;

  @media screen and (min-width: 505px) {
    max-width: calc(100% - 210px - 0.5rem) !important;
  }
`;

export const BarcodePrizeContainer = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  flex-shrink: 0;
  max-width: 300px;

  @media screen and (min-width: 505px) {
    margin-top: 0;
    max-width: 210px;
  }
`;

export const PrizeContFlex = styled(Flex)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  /* >div{
    flex-wrap: wrap!important;
    max-width: 100% !important;
    >div{
      display: flex;
      gap: 0.5rem;;
      flex-wrap: nowrap;
      flex-direction: row;
    }
  } */
  @media screen and (min-width: 505px) {
    flex-wrap: nowrap;
  }
`;

export const ContainerForText = styled.div``;

export const BarcodeContainer = styled.div`
  flex-shrink: 0;
  border-radius: 12px;
  background: white;
  border: 5px solid white;
  display: grid;
  place-items: center;
  overflow: hidden;
  width: 100%;

  @media screen and (min-width: 505px) {
    max-width: fit-content;
  }
  svg {
    max-height: 100%;
    width: 100%;
    max-width: 250px;
  }
`;

export const BlueBlockImage = styled(Image)`
  background: #2264ab;
  flex-shrink: 0;
  margin: 0;
`;

export const NotificationCell = styled(Cell)`
  flex-shrink: 0;
  padding: 0;
  margin: 0.5rem -12px 0;
`;

export const MainCardContainer = styled.div`
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;

  @media screen and (min-width: 505px) {
    flex-wrap: nowrap;
  }
`;

export const PromoCodeCopyContainer = styled.div`
  @media screen and (min-width: 505px) {
    display: flex;
    justify-content: space-between;
    > div:first-child {
      max-width: 70%;
    }
  }
`;
